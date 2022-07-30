import { Total } from "@/lib/status"
import { FC } from "react"

type Props = {
  total: Total
}

const Result: FC<Props> = ({ total }: Props) => {
  return (
    <div>
      <div>{total.expectedValue.toFixed(2)}</div>
      <div>攻撃力: {total.attack.toFixed(2)}</div>
      <div>会心率: {total.affinity.toFixed(2)}</div>
    </div>
  )
}

export default Result
