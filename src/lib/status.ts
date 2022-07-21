import Decimal, { Numeric } from "decimal.js-light"

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

type Agitator = {
  readonly text: string
  readonly attack: number
  readonly affinity: number
}

type Bludgeoner = Factor & { activeLevel: number }

const UNIT_FACTOR = new Decimal(1)

function createOptionalIncreaseGetter(increase: number): (x: boolean) => number {
  return (x) => (x ? increase : 0)
}

function createOptionalFactorGetter(factor: Decimal): (x: boolean) => Decimal {
  return (x) => (x ? factor : UNIT_FACTOR)
}

function createIncreaseSkill(increases: number[], prefix: string): Increase[] {
  return [{ text: "", increase: 0 }, ...increases.map((increase) => ({ text: `${prefix}+${increase}`, increase }))]
}

function createAttackIncreaseSkill(increases: number[]): Increase[] {
  return createIncreaseSkill(increases, "攻撃力")
}

function createAffinityIncreaseSkill(increases: number[]): Increase[] {
  return createIncreaseSkill(increases, "会心率")
}

function createFactorSkill(factors: Numeric[], prefix: string): Factor[] {
  return [
    { text: "", factor: UNIT_FACTOR },
    ...factors.map((f) => {
      const factor = f instanceof Decimal ? f : new Decimal(f)
      return { text: `${prefix}${factor.toString()}倍`, factor }
    }),
  ]
}

function createDamageFactorSkill(factors: Numeric[]): Factor[] {
  return createFactorSkill(factors, "ダメージ")
}

export type Status = {
  readonly weapon: {
    readonly attack: number
    readonly affinity: number
    readonly sharpness: Sharpness
    readonly barrel: Factor
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
    readonly agitator: Agitator
    readonly resuscitate: Increase
    readonly resentment: Increase
    readonly dragonheart: Factor
    readonly chainCrit: Increase
    readonly chainCritGunner: Increase
    readonly bloodlust: Increase
    readonly bloodlustRestored: Increase
    readonly coalescence: Increase
    readonly dereliction: Increase
    readonly mailOfHellfire: Increase
    readonly bludgeoner: Bludgeoner
    readonly artillery: Factor
    readonly rapidMorph: Factor
    readonly ammoAndArrowUp: Factor
    readonly rapidFireUp: Factor
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
  { text: "紫 (1.44)", factor: new Decimal("1.44") },
].map((factor, level) => ({ level, ...factor }))

export const [
  SHARPNESS_RED,
  SHARPNESS_ORANGE,
  SHARPNESS_YELLOW,
  SHARPNESS_GREEN,
  SHARPNESS_BLUE,
  SHARPNESS_WHITE,
  SHARPNESS_PURPLE,
] = SHARPNESSES

export const BARRELS: Factor[] = [
  { text: "なし", factor: UNIT_FACTOR },
  { text: "ロングバレル（1.0475倍）", factor: new Decimal("1.0475") },
  { text: "パワーバレル（1.125倍）", factor: new Decimal("1.125") },
]
export const [NO_BARREL, LONG_BARREL, POWER_BARREL] = BARRELS

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

export const DANGO_TEMPER = new Decimal("1.05")
export const getDangoTemper = createOptionalFactorGetter(DANGO_TEMPER)

export const RAMPAGE_ATTACK_BOOSTS = createAttackIncreaseSkill([4, 6, 8, 10])
export const RAMPAGE_AFFINITY_BOOSTS = createAffinityIncreaseSkill([4, 6, 8, 10])

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
  { text: "攻撃力+3", increase: 3, factor: UNIT_FACTOR },
  { text: "攻撃力+6", increase: 6, factor: UNIT_FACTOR },
  { text: "攻撃力+9", increase: 9, factor: UNIT_FACTOR },
  { text: "攻撃力1.05倍 & +7", increase: 7, factor: new Decimal("1.05") },
  { text: "攻撃力1.06倍 & +8", increase: 8, factor: new Decimal("1.06") },
  { text: "攻撃力1.08倍 & +9", increase: 9, factor: new Decimal("1.08") },
  { text: "攻撃力1.1倍 & +10", increase: 10, factor: new Decimal("1.1") },
]

export const CRITICAL_EYES = createAffinityIncreaseSkill([5, 10, 15, 20, 25, 30, 40])

export const WEAKNESS_EXPLOITS = createAffinityIncreaseSkill([15, 30, 50])

export const MAXIMUM_MIGHTS = createAffinityIncreaseSkill([10, 20, 30])

export const CRITICAL_DRAWS = createAffinityIncreaseSkill([10, 20, 40])

export const CRITICAL_BOOSTS: Factor[] = [
  { text: "1.25", factor: DEFAULT_CRITICAL_RATE },
  { text: "1.30", factor: new Decimal("0.30") },
  { text: "1.35", factor: new Decimal("0.35") },
  { text: "1.40", factor: new Decimal("0.40") },
]

export const OFFENSIVE_GUARDS = createFactorSkill(["1.05", "1.1", "1.15"], "攻撃力")

export const PEAK_PERFORMANCES = createAttackIncreaseSkill([5, 10, 20])

export const LATENT_POWERS = createAffinityIncreaseSkill([10, 20, 30, 40, 50])

export const AGITATORS: Agitator[] = [
  { text: "", attack: 0, affinity: 0 },
  { text: "攻撃力+4 & 会心率+3", attack: 4, affinity: 3 },
  { text: "攻撃力+8 & 会心率+5", attack: 8, affinity: 5 },
  { text: "攻撃力+12 & 会心率+7", attack: 12, affinity: 7 },
  { text: "攻撃力+16 & 会心率+10", attack: 16, affinity: 10 },
  { text: "攻撃力+20 & 会心率+15", attack: 20, affinity: 15 },
]

export const RESUSCITATE = createAttackIncreaseSkill([5, 10, 20])

export const RESENTMENT = createAttackIncreaseSkill([5, 10, 15, 20, 25])

export const DRAGONHEART = createDamageFactorSkill(["1.0", "1.0", "1.0", "1.05", "1.1"])

export const CHAIN_CRIT = createAttackIncreaseSkill([10, 12, 15])

export const CHAIN_CRIT_GUNNER = createAttackIncreaseSkill([8, 9, 10])

export const BLOODLUST = createAttackIncreaseSkill([10, 15, 20])

export const BLOODLUST_RESTORED = createAffinityIncreaseSkill([20, 25, 25])

export const COALESCENCE = createAttackIncreaseSkill([12, 15, 18])

export const DERELICTION = createAttackIncreaseSkill([25, 30, 35])

export const MAIL_OF_HELLFIRE = createAttackIncreaseSkill([15, 25, 25])

export const BLUDGEONERS: Bludgeoner[] = [
  { text: "", factor: UNIT_FACTOR, activeLevel: SHARPNESS_RED.level },
  { text: "斬れ味が黄色以下の時、攻撃力1.05倍", factor: new Decimal("1.05"), activeLevel: SHARPNESS_YELLOW.level },
  { text: "斬れ味が黄色以下の時、攻撃力1.1倍", factor: new Decimal("1.1"), activeLevel: SHARPNESS_YELLOW.level },
  { text: "斬れ味が緑色以下の時、攻撃力1.1倍", factor: new Decimal("1.1"), activeLevel: SHARPNESS_GREEN.level },
]

export const ARTILLERIES = createDamageFactorSkill(["1.1", "1.2", "1.3"])

export const RAPID_MORPHS: Factor[] = [
  { text: "", factor: UNIT_FACTOR },
  { text: "", factor: UNIT_FACTOR },
  { text: "ダメージ1.1倍", factor: new Decimal("1.1") },
  { text: "ダメージ1.2倍", factor: new Decimal("1.2") },
]

export const AMMO_AND_ARROW_UPS = createDamageFactorSkill(["1.05", "1.1", "1.2"])
export const RAPID_FIRE_UPS = createDamageFactorSkill(["1.05", "1.1", "1.2"])

export type Total = {
  attack: number
  affinity: number
  expectedValue: number
}

export function calculateTotal(status: Status): Total {
  const skill = status.skill
  const baseAttack = calculateBaseAttack(status)
  const attack = product(
    baseAttack,
    status.weapon.sharpness.factor,
    status.dango.temper,
    calculateDullingStrikeFactor(status),
    skill.artillery,
    skill.rapidMorph,
    skill.ammoAndArrowUp,
    skill.rapidFireUp
  )
  const affinity = calculateAffinity(status)
  const criticalFactor = calculateCriticalFactor(status, affinity)
  return {
    attack: attack.toNumber(),
    affinity: affinity.toNumber(),
    expectedValue: attack.mul(affinity.mul(criticalFactor).div(100).add(1)).toNumber(),
  }
}

function calculateBaseAttack(status: Status): Decimal {
  const {
    weapon,
    item: { talonAndCharm, demonDrug, mightSeed, demonPowder },
    dango: { booster },
    rampage,
    skill: {
      attackBoost,
      offensiveGuard,
      peakPerformance,
      agitator,
      resuscitate,
      resentment,
      dragonheart,
      chainCrit,
      chainCritGunner,
      bloodlust,
      coalescence,
      dereliction,
      mailOfHellfire,
    },
  } = status

  const weaponAttack = new Decimal(
    sum(
      weapon.barrel.factor.mul(weapon.attack).toDecimalPlaces(0, Decimal.ROUND_DOWN).toNumber(),
      rampage.attackBoost,
      rampage.attackOrAffinitySurge.attack
    )
  )
  return product(weaponAttack, attackBoost, offensiveGuard, dragonheart, calculateBludgeonerFactor(status)).add(
    sum(
      talonAndCharm,
      mightSeed,
      demonPowder,
      booster,
      demonDrug,
      rampage.nonElementalBoost,
      attackBoost,
      peakPerformance,
      agitator.attack,
      resuscitate,
      resentment,
      chainCrit,
      chainCritGunner,
      bloodlust,
      coalescence,
      dereliction,
      mailOfHellfire
    )
  )
}

function calculateAffinity({
  weapon,
  rampage,
  skill: { criticalEye, weaknessExploit, maximumMight, criticalDraw, latentPower, agitator, bloodlustRestored },
}: Status): Decimal {
  const affinity = sum(
    weapon.affinity,
    rampage.affinityBoost,
    rampage.attackOrAffinitySurge.affinity,
    criticalEye,
    weaknessExploit,
    maximumMight,
    criticalDraw,
    latentPower,
    agitator.affinity,
    bloodlustRestored
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

function calculateBludgeonerFactor({ weapon: { sharpness }, skill: { bludgeoner } }: Status): Decimal {
  return sharpness.level <= bludgeoner.activeLevel ? bludgeoner.factor : UNIT_FACTOR
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
