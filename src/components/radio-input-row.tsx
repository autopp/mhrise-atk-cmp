import React, { FC } from "react"
import { State } from "@/lib/types"
import InputRow from "./input-row"
import RadioInput from "./radio-input"

type Props = {
  label: string
  idPrefix: string
  options: string[]
  leftState: State<number>
  rightState: State<number>
  syncedState: State<boolean>
}

const RadioInputRow: FC<Props> = ({ label, idPrefix, options, leftState, rightState, syncedState }: Props) => {
  const leftElem = <RadioInput {...{ idPrefix, options, state: leftState }} />
  const rightElem = <RadioInput {...{ idPrefix, options, state: rightState }} />
  return <InputRow label={label} syncedState={syncedState} left={leftElem} right={rightElem} />
}

export default RadioInputRow
