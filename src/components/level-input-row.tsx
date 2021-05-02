import { FC } from "react"
import { State } from "@/lib/types"
import InputRow from "./input-row"
import LevelInput from "./level-input"

type Props = {
  label: string
  levels: { text: string }[]
  leftState: State<number>
  rightState: State<number>
  syncedState: State<boolean>
}

const LevelInputRow: FC<Props> = ({ label, levels, leftState, rightState, syncedState }: Props) => {
  const leftElem = <LevelInput levels={levels} state={leftState} />
  const rightElem = <LevelInput levels={levels} state={rightState} />
  return <InputRow label={label} syncedState={syncedState} left={leftElem} right={rightElem} />
}

export default LevelInputRow
