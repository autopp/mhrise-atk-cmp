export type Color = "red" | "orange" | "yellow" | "green" | "blue" | "white"

export type Sharpness = {
  readonly color: Color
  readonly text: string
  readonly factor: number
}

export type Status = {
  readonly weapon: {
    readonly attack: number
    readonly critical: number
    readonly sharpness: Sharpness
  }
  readonly item: {
    talonAndCharm: boolean
  }
}

export const sharpnesses: { readonly [k in Color]: Sharpness } = {
  red: { color: "red", text: "赤 (0.5)", factor: 50 },
  orange: { color: "orange", text: "橙 (0.75)", factor: 75 },
  yellow: { color: "yellow", text: "黄 (1.0)", factor: 100 },
  green: { color: "green", text: "緑 (1.05)", factor: 105 },
  blue: { color: "blue", text: "青 (1.2)", factor: 120 },
  white: { color: "white", text: "白 (1.32)", factor: 132 },
}
