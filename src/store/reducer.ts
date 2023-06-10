import { AppAction } from "../global";
import { CHANGE_SELECTED_TOKEN } from "./constants";
import { IStoreState } from "./types";

const defaultState: IStoreState = {
  selectedToken: undefined,
};

export const storeReducer = (
  state: IStoreState = defaultState,
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