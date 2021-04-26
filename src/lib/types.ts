export type State<S> = [S, (v: S) => void]
export type SyncedState = State<boolean>
