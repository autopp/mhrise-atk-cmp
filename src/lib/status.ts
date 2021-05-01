export type Sharpness = {
  readonly text: string
  readonly factor: number
}

export type Demondrug = {
  readonly text: string
  readonly increase: number
}

export type Status = {
  readonly weapon: {
    readonly attack: number
    readonly critical: number
    readonly sharpness: Sharpness
  }
  readonly item: {
    readonly talonAndCharm: boolean
    readonly demonDrug: Demondrug
    readonly mightSeed: boolean
    readonly demonPowder: boolean
  }
}

export const SHARPNESSES: Sharpness[] = [
  { text: "赤 (0.5)", factor: 50 },
  { text: "橙 (0.75)", factor: 75 },
  { text: "黄 (1.0)", factor: 100 },
  { text: "緑 (1.05)", factor: 105 },
  { text: "青 (1.2)", factor: 120 },
  { text: "白 (1.32)", factor: 132 },
]

export const [
  SHARPNESS_RED,
  SHARPNESS_ORANGE,
  SHARPNESS_YELLOW,
  SHARPNESS_GREEN,
  SHARPNESS_BLUE,
  SHARPNESS_WHITE,
] = SHARPNESSES

export const DEMONDRUGS: Demondrug[] = [
  { text: "なし", increase: 0 },
  { text: "鬼人薬（+5）", increase: 5 },
  { text: "鬼人薬グレート（+7）", increase: 7 },
]

export const [DEMONDRUG_NONE, DEMONDRUG_NORMAL, DEMONDRUG_MEGA] = DEMONDRUGS
