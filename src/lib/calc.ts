import { Status } from "./status"

export type Total = {
  attack: number
  critical: number
  expectedValue: number
}

export function calculateTotal(status: Status): Total {
  const baseAttack = calculateBaseAttack(status)
  const attack = baseAttack * status.weapon.sharpness.factor * status.dango.temper
  const critical = calculateAffinity(status)
  return {
    attack,
    critical,
    expectedValue: attack * (1 + (critical * 0.25) / 100),
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
    rampage.attackBoost.increase
  )
}

function calculateAffinity({ weapon, rampage }: Status) {
  return Math.min(Math.max(weapon.critical + rampage.affinityBoost.increase, -100), 100)
}
