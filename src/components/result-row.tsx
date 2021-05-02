import { Status, calculateTotal } from "@/lib/status"
import { FC } from "react"
import { inputColClass, labelColClass, syncColClass } from "./input-row"
import Result from "./result"
import SyncAllButton from "./sync-all-button"

type Props = {
  left: Status
  right: Status
  syncedSetters: ((v: boolean) => void)[]
}

const ResultRow: FC<Props> = ({ left, right, syncedSetters }: Props) => {
  return (
    <div className="row">
      <div className={labelColClass}>
        <p>計算結果</p>
      </div>
      <div className={inputColClass}>
        <Result total={calculateTotal(left)} />
      </div>
      <div className={syncColClass}>
        <SyncAllButton setters={syncedSetters} />
      </div>
      <div className={inputColClass}>
        <Result total={calculateTotal(right)} />
      </div>
    </div>
  )
}

export default ResultRow
