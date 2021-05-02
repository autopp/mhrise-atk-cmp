import { FC, ReactElement } from "react"
import { State } from "@/lib/types"
import SyncButton from "./sync-button"
import styles from "./input-row.module.css"

type Props = {
  label: string
  left: ReactElement
  right: ReactElement
  syncedState: State<boolean>
}

export const labelColClass = "col-lg-2"
export const inputColClass = "col-lg-4 center"
export const syncColClass = "col-lg-2 center"

const InputRow: FC<Props> = ({ label, left, right, syncedState }: Props) => {
  return (
    <div className={`row ${styles.inputRow}`}>
      <div className={`align-self-center ${labelColClass}`}>
        <p>{label}</p>
      </div>
      <div className={`align-self-center ${inputColClass}`}>{left}</div>
      <div className={`align-self-center ${syncColClass}`}>
        <SyncButton state={syncedState} />
      </div>
      <div className={`align-self-center ${inputColClass}`}>{right}</div>
    </div>
  )
}

export default InputRow
