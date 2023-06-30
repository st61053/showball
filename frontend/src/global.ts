import { IPlayer, IPlayerState } from "./players/types";
import { ISettingsState } from "./settings/types";
import { IStoreState } from "./store/types";
import { IToken, ITokenState } from "./tokens/types";

interface GlobalState {
  tokens: ITokenState;
  store: IStoreState;
  players: IPlayerState;
  settings: ISettingsState;
}

interface AppState {
  type: string;
  count: number;
  // tokens
  token: IToken;
}

interface AppAction {
  type: string;
  // tokens
  token?: IToken;
  tokens?: IToken[];
  // players
  player?: IPlayer;
  players?: IPlayer[];
  spin?: boolean;
  // resources
  count?: number;
}

export type { GlobalState, AppAction, AppState };
