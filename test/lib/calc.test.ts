import { calculateTotal, Total } from "@/lib/calc"
import { sharpnesses, Status } from "@/lib/status"

const RED = sharpnesses.red
const ORANGE = sharpnesses.orange
const YELLOW = sharpnesses.yellow
const GREEN = sharpnesses.green
const BLUE = sharpnesses.blue
const WHITE = sharpnesses.white

describe("calculateTotal", () => {
  describe.each<[Status, Total]>([
    [{ weapon: { attack: 100, critical: 0, sharpness: YELLOW } }, { attack: 100, critical: 0, expectedValue: 100 }],
    [{ weapon: { attack: 100, critical: 50, sharpness: YELLOW } }, { attack: 100, critical: 50, expectedValue: 112.5 }],
  ])("case %#", (status, expected) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      expect(calculateTotal(status)).toEqual(expected)
    })
  })
})
