type Increase = {
  readonly text: string
  readonly increase: number
}

type Factor = {
  readonly text: string
  readonly factor: number
}

type Sharpness = Factor & { level: number }

type AttackOrAffinitySurge = {
  readonly text: string
  readonly attack: number
  readonly affinity: number
}

function createOptionalIncreaseGetter(increase: number): (x: boolean) => number {
  return (x) => (x ? increase : 0)
}

function createOptionalFactorGetter(factor: number): (x: boolean) => number {
  return (x) => (x ? factor : 1)
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
    readonly temper: number
  }
  readonly rampage: {
    readonly attackBoost: Increase
    readonly affinityBoost: Increase
    readonly nonElementalBoost: number
    readonly dullingStrike: boolean
    readonly brutalStrike: boolean
    readonly attackOrAffinitySurge: AttackOrAffinitySurge
  }
}

export const SHARPNESSES: Sharpness[] = [
  { text: "赤 (0.5)", factor: 0.5 },
  { text: "橙 (0.75)", factor: 0.75 },
  { text: "黄 (1.0)", factor: 1 },
  { text: "緑 (1.05)", factor: 1.05 },
  { text: "青 (1.2)", factor: 1.2 },
  { text: "白 (1.32)", factor: 1.32 },
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

export const DANGO_TEMPER = 1.05
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

export type Total = {
  attack: number
  affinity: number
  expectedValue: number
}

export function calculateTotal(status: Status): Total {
  const baseAttack = calculateBaseAttack(status)
  const attack =
    baseAttack * status.weapon.sharpness.factor * status.dango.temper * calculateDullingStrikeFactor(status)
  const affinity = calculateAffinity(status)
  const criticalFactor = calculateCriticalFactor(status, affinity)
  return {
    attack,
    affinity,
    expectedValue: (attack * (100 + affinity * criticalFactor)) / 100,
  }
}

function calculateBaseAttack({
  weapon,
  item: { talonAndCharm, demonDrug, mightSeed, demonPowder },
  dango: { booster },
  rampage,
}: Status): number {
  return (
    weapon.attack +
    talonAndCharm +
    mightSeed +
    demonPowder +
    booster +
    demonDrug.increase +
    rampage.attackBoost.increase +
    rampage.nonElementalBoost +
    rampage.attackOrAffinitySurge.attack
  )
}

function calculateAffinity({ weapon, rampage }: Status) {
  const affinity = weapon.affinity + rampage.affinityBoost.increase + rampage.attackOrAffinitySurge.affinity
  return Math.min(Math.max(affinity, -100), 100)
}

function calculateCriticalFactor({ rampage: { brutalStrike } }: Status, affinity: number) {
  return affinity < 0 && brutalStrike ? 0.0625 : 0.25
}

function calculateDullingStrikeFactor({ weapon: { sharpness }, rampage: { dullingStrike } }: Status): number {
  return dullingStrike && sharpness.level <= SHARPNESS_GREEN.level ? 1.02 : 1.0
}
