import { useState } from "react"
import { State, SyncedState } from "./types"

export type PairingState<S> = {
  leftState: State<S>
  rightState: State<S>
  syncedState: SyncedState
  swap: () => void
}

export function usePairingState<S>(initialState: S): PairingState<S> {
  const [left, setLeft] = useState(initialState)
  const [right, setRight] = useState(initialState)
  const [synced, setSynced] = useState(false)

  const setLeftWithSync = (v: S) => {
    setLeft(v)
    if (synced) {
      setRight(v)
    }
  }

  const setRightWithSync = (v: S) => {
    setRight(v)
    if (synced) {
      setLeft(v)
    }
  }

  const setSyncedWithSync = (v: boolean) => {
    setSynced(v)
    if (v) {
      setRight(left)
    }
  }

  const swap = () => {
    setLeft(right)
    setRight(left)
  }

  return {
    leftState: [left, setLeftWithSync],
    rightState: [right, setRightWithSync],
    syncedState: [synced, setSyncedWithSync],
    swap,
  }
}
