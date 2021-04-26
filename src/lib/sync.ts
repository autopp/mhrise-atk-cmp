import { State, SyncedState } from "./types"

export function createPairingState<S>(
  leftState: State<S>,
  rightState: State<S>,
  syncedState: SyncedState
): { leftState: State<S>; rightState: State<S>; syncedState: SyncedState } {
  const [left, setLeft] = leftState
  const [right, setRight] = rightState
  const [synced, setSynced] = syncedState

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

  return {
    leftState: [left, setLeftWithSync],
    rightState: [right, setRightWithSync],
    syncedState: [synced, setSyncedWithSync],
  }
}
