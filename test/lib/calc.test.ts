import { calculateTotal, Total } from "@/lib/calc"
import { SHARPNESS_BLUE, SHARPNESS_YELLOW, Status } from "@/lib/status"
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
    [{ item: { talonAndCharm: true } }, { attack: 115, critical: 0, expectedValue: 115 }],
  ])("case %#", (partialStatus, expected) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      const status = createStatus(partialStatus)
      expect(calculateTotal(status)).toEqual(expected)
    })
  })
})
