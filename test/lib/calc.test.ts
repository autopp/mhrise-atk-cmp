import { calculateTotal, Total } from "@/lib/calc"
import { sharpnesses, Status } from "@/lib/status"
import { DeepPartial } from "ts-essentials"
import { merge as mergeObject } from "lodash"

const RED = sharpnesses.red
const ORANGE = sharpnesses.orange
const YELLOW = sharpnesses.yellow
const GREEN = sharpnesses.green
const BLUE = sharpnesses.blue
const WHITE = sharpnesses.white

const defaultStatus: Status = {
  weapon: {
    attack: 100,
    critical: 0,
    sharpness: YELLOW,
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
    [{ item: { talonAndCharm: true } }, { attack: 115, critical: 0, expectedValue: 115 }],
  ])("case %#", (partialStatus, expected) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      const status = createStatus(partialStatus)
      expect(calculateTotal(status)).toEqual(expected)
    })
  })
})
