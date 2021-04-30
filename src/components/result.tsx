import { Total } from "@/lib/calc"
import { FC } from "react"

type Props = {
  total: Total
}

const Result: FC<Props> = ({ total }: Props) => {
  return (
    <div>
      <p>{total.expectedValue}</p>
    </div>
  )
}

export default Result