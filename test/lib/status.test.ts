import {
  calculateTotal,
  Total,
  DANGO_BOOSTER,
  DANGO_TEMPER,
  DEMONDRUG_MEGA,
  DEMONDRUG_NONE,
  DEMON_POWDER,
  MIGHT_SEED,
  RAMPAGE_AFFINITY_BOOSTS,
  RAMPAGE_ATTACK_BOOSTS,
  RAMPAGE_NON_ELEMENTAL_BOOST,
  SHARPNESS_BLUE,
  SHARPNESS_YELLOW,
  Status,
  TALON_AND_CHARM,
  RAMPAGE_NO_SURGE,
  RAMPAGE_ATTACK_SURGE,
  RAMPAGE_AFFINITY_SURGE,
} from "@/lib/status"
import { DeepPartial } from "ts-essentials"
import { merge as mergeObject } from "lodash"
import Decimal from "decimal.js-light"

const defaultStatus: Status = {
  weapon: {
    attack: 100,
    affinity: 0,
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
    temper: new Decimal(1),
  },
  rampage: {
    attackBoost: RAMPAGE_ATTACK_BOOSTS[0],
    affinityBoost: RAMPAGE_AFFINITY_BOOSTS[0],
    nonElementalBoost: 0,
    dullingStrike: false,
    brutalStrike: false,
    attackOrAffinitySurge: RAMPAGE_NO_SURGE,
  },
}

function createStatus(partialStatus: DeepPartial<Status>): Status {
  return mergeObject({}, defaultStatus, partialStatus)
}

describe("calculateTotal", () => {
  describe.each<[DeepPartial<Status>, Total]>([
    [{}, { attack: 100, affinity: 0, expectedValue: 100 }],
    [{ weapon: { affinity: 50 } }, { attack: 100, affinity: 50, expectedValue: 112.5 }],
    [{ weapon: { sharpness: SHARPNESS_BLUE } }, { attack: 120, affinity: 0, expectedValue: 120 }],
    [
      { weapon: { attack: 85, sharpness: SHARPNESS_BLUE }, item: { talonAndCharm: TALON_AND_CHARM } },
      { attack: 120, affinity: 0, expectedValue: 120 },
    ],
    [
      { weapon: { attack: 93 }, item: { demonDrug: DEMONDRUG_MEGA } },
      { attack: 100, affinity: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 90 }, item: { mightSeed: MIGHT_SEED } },
      { attack: 100, affinity: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 90 }, item: { demonPowder: DEMON_POWDER } },
      { attack: 100, affinity: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 91 }, dango: { booster: DANGO_BOOSTER } },
      { attack: 100, affinity: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 100, sharpness: SHARPNESS_BLUE }, dango: { temper: DANGO_TEMPER } },
      { attack: 126, affinity: 0, expectedValue: 126 },
    ],
    [
      { weapon: { attack: 92 }, rampage: { attackBoost: RAMPAGE_ATTACK_BOOSTS[3] } },
      { attack: 100, affinity: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 100, affinity: 12 }, rampage: { affinityBoost: RAMPAGE_AFFINITY_BOOSTS[3] } },
      { attack: 100, affinity: 20, expectedValue: 105 },
    ],
    [
      { weapon: { attack: 100, affinity: 95 }, rampage: { affinityBoost: RAMPAGE_AFFINITY_BOOSTS[4] } },
      { attack: 100, affinity: 100, expectedValue: 125 },
    ],
    [
      { weapon: { attack: 90 }, rampage: { nonElementalBoost: RAMPAGE_NON_ELEMENTAL_BOOST } },
      { attack: 100, affinity: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 100 }, rampage: { dullingStrike: true } },
      { attack: 102, affinity: 0, expectedValue: 102 },
    ],
    [
      { weapon: { attack: 100 }, rampage: { brutalStrike: true } },
      { attack: 100, affinity: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 100, affinity: 40 }, rampage: { brutalStrike: true } },
      { attack: 100, affinity: 40, expectedValue: 110 },
    ],
    [
      { weapon: { attack: 100, affinity: -40 }, rampage: { brutalStrike: true } },
      { attack: 100, affinity: -40, expectedValue: 97.5 },
    ],
    [
      { weapon: { attack: 160, affinity: -100 }, rampage: { brutalStrike: true } },
      { attack: 160, affinity: -100, expectedValue: 150 },
    ],
    [
      { weapon: { attack: 80 }, rampage: { attackOrAffinitySurge: RAMPAGE_ATTACK_SURGE } },
      { attack: 100, affinity: -30, expectedValue: 92.5 },
    ],
    [
      { weapon: { attack: 80, affinity: -80 }, rampage: { attackOrAffinitySurge: RAMPAGE_ATTACK_SURGE } },
      { attack: 100, affinity: -100, expectedValue: 75 },
    ],
    [
      { weapon: { attack: 110 }, rampage: { attackOrAffinitySurge: RAMPAGE_AFFINITY_SURGE } },
      { attack: 100, affinity: 20, expectedValue: 105 },
    ],
  ])("case %#", (partialStatus, expected) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      const status = createStatus(partialStatus)
      expect(calculateTotal(status)).toEqual(expected)
    })
  })
})
