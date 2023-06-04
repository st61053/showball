import { AppAction } from "../global";
import { CHANGE_SELECTED_TOKEN, LOAD_TOKENS } from "./constants";
import { ITokenState } from "./types";

const defaultState: ITokenState = {
  selectedToken: undefined,
  tokens: []
};

export const tokensReducer = (
  state: ITokenState = defaultState,
  action: AppAction
) => {
  switch (action.type) {
    case CHANGE_SELECTED_TOKEN:
      return {
        ...state,
        selectedToken : action.token
      };
      case LOAD_TOKENS:
        return {
          ...state,
          tokens : action.tokens
        };
    default:
      return state;
  }
};
