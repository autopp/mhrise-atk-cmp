import { FC } from "react"
import { State } from "@/lib/types"

type Props = {
  idPrefix: string
  options: string[]
  state: State<number>
}

const RadioInput: FC<Props> = ({ idPrefix, options, state: [selected, setSelected] }: Props) => {
  return (
    <div className="form-check">
      {options.map((option, i) => {
        const id = `${idPrefix}${i}`
        return (
          <>
            <input
              className="form-check-input"
              type="radio"
              id={id}
              checked={i === selected}
              onChange={() => setSelected(i)}
            />
            <label className="form-check-label" htmlFor={id}>
              {option}
            </label>
          </>
        )
      })}
    </div>
  )
}

export default RadioInput
