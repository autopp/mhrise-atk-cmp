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

function createFactorSkill(levels: Factor[]): Factor[] {
  return [{ text: "", factor: UNIT_FACTOR }, ...levels]
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
    readonly weaknessExploit: Increase
    readonly maximumMight: Increase
    readonly criticalDraw: Increase
    readonly criticalBoost: Factor
    readonly offensiveGuard: Factor
    readonly peakPerformance: Increase
    readonly latentPower: Increase
  }
}

const DEFAULT_CRITICAL_RATE = new Decimal("0.25")

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

const RAMPAGE_DULLING_STRIKE = new Decimal("1.02")

const RAMPAGE_BRUTAL_STRIKE = new Decimal("0.0625")

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

export const WEAKNESS_EXPLOITS = createIncreaseSkill([15, 30, 50].map((x) => ({ text: `+${x}`, increase: x })))

export const MAXIMUM_MIGHTS = createIncreaseSkill([10, 20, 30].map((x) => ({ text: `+${x}`, increase: x })))

export const CRITICAL_DRAWS = createIncreaseSkill([10, 20, 40].map((x) => ({ text: `+${x}`, increase: x })))

export const CRITICAL_BOOSTS: Factor[] = [
  { text: "1.25", factor: DEFAULT_CRITICAL_RATE },
  { text: "1.30", factor: new Decimal("0.30") },
  { text: "1.35", factor: new Decimal("0.35") },
  { text: "1.40", factor: new Decimal("0.40") },
]

export const OFFENSIVE_GUARDS = createFactorSkill(
  ["1.05", "1.1", "1.15"].map((v) => ({ text: `${v}倍`, factor: new Decimal(v) }))
)

export const PEAK_PERFORMANCES = createIncreaseSkill([5, 10, 20].map((x) => ({ text: `+${x}`, increase: x })))

export const LATENT_POWERS = createIncreaseSkill([10, 20, 30, 40, 50].map((x) => ({ text: `+${x}`, increase: x })))

export type Total = {
  attack: number
  affinity: number
  expectedValue: number
}

export function calculateTotal(status: Status): Total {
  const baseAttack = calculateBaseAttack(status)
  const attack = product(
    baseAttack,
    status.weapon.sharpness.factor,
    status.dango.temper,
    calculateDullingStrikeFactor(status)
  )
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
  skill: { attackBoost, offensiveGuard, peakPerformance },
}: Status): Decimal {
  const weaponAttack = new Decimal(sum(weapon.attack, rampage.attackBoost, rampage.attackOrAffinitySurge.attack))
  return product(weaponAttack, attackBoost, offensiveGuard).add(
    sum(
      talonAndCharm,
      mightSeed,
      demonPowder,
      booster,
      demonDrug,
      rampage.nonElementalBoost,
      attackBoost,
      peakPerformance
    )
  )
}

function calculateAffinity({
  weapon,
  rampage,
  skill: { criticalEye, weaknessExploit, maximumMight, criticalDraw, latentPower },
}: Status): Decimal {
  const affinity = sum(
    weapon.affinity,
    rampage.affinityBoost,
    rampage.attackOrAffinitySurge.affinity,
    criticalEye,
    weaknessExploit,
    maximumMight,
    criticalDraw,
    latentPower
  )

  return new Decimal(Math.min(Math.max(affinity, -100), 100))
}

function calculateCriticalFactor(
  { rampage: { brutalStrike }, skill: { criticalBoost } }: Status,
  affinity: Decimal
): Decimal {
  if (affinity.isNegative()) {
    return brutalStrike ? RAMPAGE_BRUTAL_STRIKE : DEFAULT_CRITICAL_RATE
  }

  return criticalBoost.factor
}

function calculateDullingStrikeFactor({ weapon: { sharpness }, rampage: { dullingStrike } }: Status): Decimal {
  return dullingStrike && sharpness.level <= SHARPNESS_GREEN.level ? RAMPAGE_DULLING_STRIKE : UNIT_FACTOR
}

function sum(...values: (number | Increase)[]): number {
  return values.reduce<number>((s, x) => s + (typeof x === "number" ? x : x.increase), 0)
}

function product(...values: (number | Decimal | Factor)[]): Decimal {
  return values.reduce<Decimal>(
    (p, x) => p.mul(typeof x === "number" ? new Decimal(x) : x instanceof Decimal ? x : x.factor),
    UNIT_FACTOR
  )
}
