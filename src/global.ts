import { IPlayerState } from "./players/types";

interface GlobalState {
    players : IPlayerState
}

interface AppState {
  counter: number;
}

interface AppAction {
  type: string;
}

export type { GlobalState, AppAction, AppState };