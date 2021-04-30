import { FC } from "react"
import { State } from "@/lib/types"
import InputRow from "./input-row"
import CheckboxInput from "./checkbox-input"

type Props = {
  label: string
  leftState: State<boolean>
  rightState: State<boolean>
  syncedState: State<boolean>
}

const CheckboxInputRow: FC<Props> = ({ label, syncedState, leftState, rightState }: Props) => {
  const leftElem = <CheckboxInput state={leftState} />
  const rightElem = <CheckboxInput state={rightState} />
  return <InputRow label={label} syncedState={syncedState} left={leftElem} right={rightElem} />
}

export default CheckboxInputRow
