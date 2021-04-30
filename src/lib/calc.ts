import { Status } from "./status"

export type Total = {
  attack: number
  critical: number
  expectedValue: number
}

export function calculateTotal({ weapon, item }: Status): Total {
  const attack = ((weapon.attack + (item.talonAndCharm ? 15 : 0)) * weapon.sharpness.factor) / 100
  const critical = weapon.critical
  return {
    attack,
    critical,
    expectedValue: attack * (1 + (critical * 0.25) / 100),
  }
}
