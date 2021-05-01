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

function calculateBaseAttack({ weapon, item: { talonAndCharm, demonDrug, mightSeed, demonPowder } }: Status): number {
  return (
    weapon.attack + orZero(talonAndCharm, 15) + orZero(mightSeed, 10) + orZero(demonPowder, 10) + demonDrug.increase
  )
}

function orZero(cond: boolean, increase: number) {
  return cond ? increase : 0
}
