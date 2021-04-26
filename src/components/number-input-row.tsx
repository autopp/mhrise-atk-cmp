import { State } from "@/lib/types"
import { FC } from "react"
import InputRow from "./input-row"
import NumberInput from "./number-input"

type Props = {
  label: string
  min: number
  max: number
  step: number
  syncedState: State<boolean>
  left: State<number>
  right: State<number>
}

const NumberInputRow: FC<Props> = ({ label, min, max, step, syncedState, left, right }: Props) => {
  const leftElem = <NumberInput {...{ label, min, max, step, state: left }} />
  const rightElem = <NumberInput {...{ label, min, max, step, state: right }} />
  return <InputRow label={label} syncedState={syncedState} left={leftElem} right={rightElem} />
}

export default NumberInputRow
