import { AppAction } from "../global";
import { CHANGE_SELECTED_TOKEN } from "./constants";
import { ITokenState } from "./types";

const defaultState: ITokenState = {
  selectedToken: undefined
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
    default:
      return state;
  }
};
