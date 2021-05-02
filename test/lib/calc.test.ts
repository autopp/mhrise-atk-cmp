import { calculateTotal, Total } from "@/lib/calc"
import {
  DANGO_BOOSTER,
  DANGO_TEMPER,
  DEMONDRUG_MEGA,
  DEMONDRUG_NONE,
  DEMON_POWDER,
  MIGHT_SEED,
  RAMPAGE_AFFINITY_BOOSTS,
  RAMPAGE_ATTACK_BOOSTS,
  SHARPNESS_BLUE,
  SHARPNESS_YELLOW,
  Status,
  TALON_AND_CHARM,
} from "@/lib/status"
import { DeepPartial } from "ts-essentials"
import { merge as mergeObject } from "lodash"

const defaultStatus: Status = {
  weapon: {
    attack: 100,
    critical: 0,
    sharpness: SHARPNESS_YELLOW,
  },
  item: {
    talonAndCharm: 0,
    demonDrug: DEMONDRUG_NONE,
    mightSeed: 0,
    demonPowder: 0,
  },
  dango: {
    booster: 0,
    temper: 1,
  },
  rampage: {
    attackBoost: RAMPAGE_ATTACK_BOOSTS[0],
    affinityBoost: RAMPAGE_AFFINITY_BOOSTS[0],
  },
}

function createStatus(partialStatus: DeepPartial<Status>): Status {
  return mergeObject({}, defaultStatus, partialStatus)
}

describe("calculateTotal", () => {
  describe.each<[DeepPartial<Status>, Total]>([
    [{}, { attack: 100, critical: 0, expectedValue: 100 }],
    [{ weapon: { critical: 50 } }, { attack: 100, critical: 50, expectedValue: 112.5 }],
    [{ weapon: { sharpness: SHARPNESS_BLUE } }, { attack: 120, critical: 0, expectedValue: 120 }],
    [
      { weapon: { attack: 85, sharpness: SHARPNESS_BLUE }, item: { talonAndCharm: TALON_AND_CHARM } },
      { attack: 120, critical: 0, expectedValue: 120 },
    ],
    [
      { weapon: { attack: 93 }, item: { demonDrug: DEMONDRUG_MEGA } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 90 }, item: { mightSeed: MIGHT_SEED } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 90 }, item: { demonPowder: DEMON_POWDER } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 91 }, dango: { booster: DANGO_BOOSTER } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 100, sharpness: SHARPNESS_BLUE }, dango: { temper: DANGO_TEMPER } },
      { attack: 126, critical: 0, expectedValue: 126 },
    ],
    [
      { weapon: { attack: 92 }, rampage: { attackBoost: RAMPAGE_ATTACK_BOOSTS[3] } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 100, critical: 12 }, rampage: { affinityBoost: RAMPAGE_AFFINITY_BOOSTS[3] } },
      { attack: 100, critical: 20, expectedValue: 105 },
    ],
    [
      { weapon: { attack: 100, critical: 95 }, rampage: { affinityBoost: RAMPAGE_AFFINITY_BOOSTS[4] } },
      { attack: 100, critical: 100, expectedValue: 125 },
    ],
  ])("case %#", (partialStatus, expected) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      const status = createStatus(partialStatus)
      expect(calculateTotal(status)).toEqual(expected)
    })
  })
})
