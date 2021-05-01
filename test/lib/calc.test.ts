import { calculateTotal, Total } from "@/lib/calc"
import { DEMONDRUG_MEGA, DEMONDRUG_NONE, SHARPNESS_BLUE, SHARPNESS_YELLOW, Status } from "@/lib/status"
import { DeepPartial } from "ts-essentials"
import { merge as mergeObject } from "lodash"

const defaultStatus: Status = {
  weapon: {
    attack: 100,
    critical: 0,
    sharpness: SHARPNESS_YELLOW,
  },
  item: {
    talonAndCharm: false,
    demonDrug: DEMONDRUG_NONE,
    mightSeed: false,
    demonPowder: false,
  },
  dango: {
    booster: false,
    temper: false,
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
      { weapon: { attack: 85, sharpness: SHARPNESS_BLUE }, item: { talonAndCharm: true } },
      { attack: 120, critical: 0, expectedValue: 120 },
    ],
    [
      { weapon: { attack: 93 }, item: { demonDrug: DEMONDRUG_MEGA } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 90 }, item: { mightSeed: true } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 90 }, item: { demonPowder: true } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 91 }, dango: { booster: true } },
      { attack: 100, critical: 0, expectedValue: 100 },
    ],
    [
      { weapon: { attack: 100, sharpness: SHARPNESS_BLUE }, dango: { temper: true } },
      { attack: 126, critical: 0, expectedValue: 126 },
    ],
  ])("case %#", (partialStatus, expected) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      const status = createStatus(partialStatus)
      expect(calculateTotal(status)).toEqual(expected)
    })
  })
})
