import { FC } from "react"
import { State } from "@/lib/types"

type Props = {
  state: State<number>
  min: number
  max: number
  step: number
}

const NumberInput: FC<Props> = ({ state: [value, onChange], min, max, step }: Props) => {
  const parseValue = (v: string) => {
    const n = parseInt(v, 10)
    if (n < min) {
      return min
    }
    if (n > max) {
      return max
    }
    return n
  }
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(parseValue(e.target.value))}
    />
  )
}

export default NumberInput
