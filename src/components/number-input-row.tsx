import { State } from "@/lib/types"
import { FC } from "react"
import InputRow from "./input-row"
import NumberInput from "./number-input"

type Props = {
  label: string
  min: number
  max: number
  step: number
  leftState: State<number>
  rightState: State<number>
  syncedState: State<boolean>
}

const NumberInputRow: FC<Props> = ({
  label,
  min,
  max,
  step,
  syncedState,
  leftState: left,
  rightState: right,
}: Props) => {
  const leftElem = <NumberInput {...{ min, max, step, state: left }} />
  const rightElem = <NumberInput {...{ min, max, step, state: right }} />
  return <InputRow label={label} syncedState={syncedState} left={leftElem} right={rightElem} />
}

export default NumberInputRow
