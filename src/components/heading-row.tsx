import { FC } from "react"

type Props = {
  text: string
}

const HeadingRow: FC<Props> = ({ text }: Props) => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <h3>{text}</h3>
      </div>
    </div>
  )
}

export default HeadingRow
