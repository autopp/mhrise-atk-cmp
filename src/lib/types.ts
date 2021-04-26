import { Dispatch, SetStateAction } from "react"

export type State<S> = [S, Dispatch<SetStateAction<S>>]
