import { IPlayerState } from "./players/types";
import { IStoreState } from "./store/types";
import { IToken, ITokenState } from "./tokens/types";

interface GlobalState {
  tokens: ITokenState;
  store: IStoreState;
  players: IPlayerState;
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
  tokens?: IToken[];
}

export type { GlobalState, AppAction, AppState };
