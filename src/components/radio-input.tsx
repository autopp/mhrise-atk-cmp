import { FC } from "react"
import { State } from "@/lib/types"
import styles from "./radio-input.module.css"

type Props = {
  idPrefix: string
  options: { text: string }[]
  state: State<number>
}

const RadioInput: FC<Props> = ({ idPrefix, options, state: [selected, setSelected] }: Props) => {
  return (
    <>
      {options.map((option, i) => {
        const id = `${idPrefix}${i}`
        return (
          <span className="text-nowrap" key={i}>
            <input
              className={`form-check-input ${styles.input}`}
              type="radio"
              id={id}
              checked={i === selected}
              onChange={() => setSelected(i)}
            />
            <label className={`form-check-label ${styles.label}`} htmlFor={id}>
              {option.text}
            </label>
          </span>
        )
      })}
    </>
  )
}

export default RadioInput
