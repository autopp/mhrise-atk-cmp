import { Status } from "./status"

export type Total = {
  attack: number
  critical: number
  expectedValue: number
}

export function calculateTotal(status: Status): Total {
  const baseAttack = calculateBaseAttack(status)
  const attack = (baseAttack * status.weapon.sharpness.factor) / 100
  const critical = status.weapon.critical
  return {
    attack,
    critical,
    expectedValue: attack * (1 + (critical * 0.25) / 100),
  }
}

function calculateBaseAttack({ weapon, item }: Status): number {
  return weapon.attack + (item.talonAndCharm ? 15 : 0) + item.demonDrug.increase
}
