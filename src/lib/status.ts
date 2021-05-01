type Increase = {
  readonly text: string
  readonly increase: number
}

type Factor = {
  readonly text: string
  readonly factor: number
}

function createOptionalIncreaseGetter(increase: number): (x: boolean) => number {
  return (x) => (x ? increase : 0)
}

function createOptionalFactorGetter(factor: number): (x: boolean) => number {
  return (x) => (x ? factor : 1)
}

export type Status = {
  readonly weapon: {
    readonly attack: number
    readonly critical: number
    readonly sharpness: Factor
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
}

export const SHARPNESSES: Factor[] = [
  { text: "赤 (0.5)", factor: 0.5 },
  { text: "橙 (0.75)", factor: 0.75 },
  { text: "黄 (1.0)", factor: 1 },
  { text: "緑 (1.05)", factor: 1.05 },
  { text: "青 (1.2)", factor: 1.2 },
  { text: "白 (1.32)", factor: 1.32 },
]

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
