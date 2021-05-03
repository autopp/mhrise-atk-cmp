import Decimal from "decimal.js-light"

type Increase = {
  readonly text: string
  readonly increase: number
}

type Factor = {
  readonly text: string
  readonly factor: Decimal
}

type Sharpness = Factor & { level: number }

type AttackOrAffinitySurge = {
  readonly text: string
  readonly attack: number
  readonly affinity: number
}

type AttackBoost = Increase & Factor

const UNIT_FACTOR = new Decimal(1)

function createOptionalIncreaseGetter(increase: number): (x: boolean) => number {
  return (x) => (x ? increase : 0)
}

function createOptionalFactorGetter(factor: Decimal): (x: boolean) => Decimal {
  return (x) => (x ? factor : UNIT_FACTOR)
}

function createIncreaseSkill(levels: Increase[]): Increase[] {
  return [{ text: "", increase: 0 }, ...levels]
}

export type Status = {
  readonly weapon: {
    readonly attack: number
    readonly affinity: number
    readonly sharpness: Sharpness
  }
  readonly item: {
    readonly talonAndCharm: number
    readonly demonDrug: Increase
    readonly mightSeed: number
    readonly demonPowder: number
  }
  readonly dango: {
    readonly booster: number
    readonly temper: Decimal
  }
  readonly rampage: {
    readonly attackBoost: Increase
    readonly affinityBoost: Increase
    readonly nonElementalBoost: number
    readonly dullingStrike: boolean
    readonly brutalStrike: boolean
    readonly attackOrAffinitySurge: AttackOrAffinitySurge
  }
  readonly skill: {
    readonly attackBoost: AttackBoost
    readonly criticalEye: Increase
  }
}

export const SHARPNESSES: Sharpness[] = [
  { text: "赤 (0.5)", factor: new Decimal("0.5") },
  { text: "橙 (0.75)", factor: new Decimal("0.75") },
  { text: "黄 (1.0)", factor: new Decimal("1") },
  { text: "緑 (1.05)", factor: new Decimal("1.05") },
  { text: "青 (1.2)", factor: new Decimal("1.2") },
  { text: "白 (1.32)", factor: new Decimal("1.32") },
].map((factor, level) => ({ level, ...factor }))

export const [
  SHARPNESS_RED,
  SHARPNESS_ORANGE,
  SHARPNESS_YELLOW,
  SHARPNESS_GREEN,
  SHARPNESS_BLUE,
  SHARPNESS_WHITE,
] = SHARPNESSES

export const TALON_AND_CHARM = 15
export const getTalonAndCharm = createOptionalIncreaseGetter(TALON_AND_CHARM)

export const DEMONDRUGS: Increase[] = [
  { text: "なし", increase: 0 },
  { text: "鬼人薬（+5）", increase: 5 },
  { text: "鬼人薬グレート（+7）", increase: 7 },
]
export const [DEMONDRUG_NONE, DEMONDRUG_NORMAL, DEMONDRUG_MEGA] = DEMONDRUGS

export const MIGHT_SEED = 10
export const getMightSeed = createOptionalIncreaseGetter(MIGHT_SEED)

export const DEMON_POWDER = 10
export const getDemonPowder = createOptionalIncreaseGetter(DEMON_POWDER)

export const DANGO_BOOSTER = 9
export const getDangoBooster = createOptionalIncreaseGetter(DANGO_BOOSTER)

export const DANGO_TEMPER = new Decimal(1.05)
export const getDangoTemper = createOptionalFactorGetter(DANGO_TEMPER)

export const RAMPAGE_ATTACK_BOOSTS = createIncreaseSkill([4, 6, 8, 10].map((x) => ({ text: `+${x}`, increase: x })))
export const RAMPAGE_AFFINITY_BOOSTS = createIncreaseSkill([4, 6, 8, 10].map((x) => ({ text: `+${x}`, increase: x })))

export const RAMPAGE_NON_ELEMENTAL_BOOST = 10
export const getRampageNonElementalBoost = createOptionalIncreaseGetter(RAMPAGE_NON_ELEMENTAL_BOOST)

export const RAMPAGE_ATTACK_OR_AFFINITY_SURGES: AttackOrAffinitySurge[] = [
  { text: "なし", attack: 0, affinity: 0 },
  { text: "攻撃力激化", attack: 20, affinity: -30 },
  { text: "会心率激化", attack: -10, affinity: 20 },
]
export const [RAMPAGE_NO_SURGE, RAMPAGE_ATTACK_SURGE, RAMPAGE_AFFINITY_SURGE] = RAMPAGE_ATTACK_OR_AFFINITY_SURGES

export const ATTACK_BOOSTS: AttackBoost[] = [
  { text: "", increase: 0, factor: UNIT_FACTOR },
  { text: "+3", increase: 3, factor: UNIT_FACTOR },
  { text: "+6", increase: 6, factor: UNIT_FACTOR },
  { text: "+9", increase: 9, factor: UNIT_FACTOR },
  { text: "1.05倍 & +7", increase: 7, factor: new Decimal("1.05") },
  { text: "1.06倍 & +8", increase: 8, factor: new Decimal("1.06") },
  { text: "1.08倍 & +9", increase: 9, factor: new Decimal("1.08") },
  { text: "1.1倍 & +10", increase: 10, factor: new Decimal("1.1") },
]

export const CRITICAL_EYES = createIncreaseSkill(
  [5, 10, 15, 20, 25, 30, 40].map((x) => ({ text: `+${x}`, increase: x }))
)

export type Total = {
  attack: number
  affinity: number
  expectedValue: number
}

export function calculateTotal(status: Status): Total {
  const baseAttack = calculateBaseAttack(status)
  const attack = new Decimal(baseAttack)
    .mul(status.weapon.sharpness.factor)
    .mul(status.dango.temper)
    .mul(calculateDullingStrikeFactor(status))
  const affinity = calculateAffinity(status)
  const criticalFactor = calculateCriticalFactor(status, affinity)
  return {
    attack: attack.toNumber(),
    affinity: affinity.toNumber(),
    expectedValue: attack.mul(affinity.mul(criticalFactor).div(100).add(1)).toNumber(),
  }
}

function calculateBaseAttack({
  weapon,
  item: { talonAndCharm, demonDrug, mightSeed, demonPowder },
  dango: { booster },
  rampage,
  skill: { attackBoost },
}: Status): Decimal {
  const weaponAttack = new Decimal(weapon.attack + rampage.attackBoost.increase + rampage.attackOrAffinitySurge.attack)
  return weaponAttack
    .mul(attackBoost.factor)
    .add(
      talonAndCharm +
        mightSeed +
        demonPowder +
        booster +
        demonDrug.increase +
        rampage.nonElementalBoost +
        attackBoost.increase
    )
}

function calculateAffinity({ weapon, rampage, skill: { criticalEye } }: Status): Decimal {
  const affinity =
    weapon.affinity + rampage.affinityBoost.increase + rampage.attackOrAffinitySurge.affinity + criticalEye.increase
  return new Decimal(Math.min(Math.max(affinity, -100), 100))
}

function calculateCriticalFactor({ rampage: { brutalStrike } }: Status, affinity: Decimal): Decimal {
  return affinity.isNegative() && brutalStrike ? new Decimal("0.0625") : new Decimal("0.25")
}

function calculateDullingStrikeFactor({ weapon: { sharpness }, rampage: { dullingStrike } }: Status): Decimal {
  return dullingStrike && sharpness.level <= SHARPNESS_GREEN.level ? new Decimal("1.02") : new Decimal(1.0)
}
