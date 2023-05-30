import { IPlayerState } from "./players/types";
import { IToken, ITokenState } from "./tokens/types";

interface GlobalState {
  players: IPlayerState;
  tokens: ITokenState;
}

interface AppState {
  type: string;
  // tokens
  token: IToken;
}

interface AppAction {
  type: string;
  // tokens
  token?: IToken;
}

export type { GlobalState, AppAction, AppState };
