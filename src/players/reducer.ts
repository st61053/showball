import { AppAction } from "../global";
import { COUNTER } from "./constants";
import { IPlayerState } from "./types";

const defaultState: IPlayerState = {
    players: [],
    test: 0
  };

  export const playersReducer = (
    state: IPlayerState = defaultState,
    action: AppAction
  ) => {
    switch (action.type) {
      case COUNTER:
        return {
          ...state,
          test: state.test + 1
        }
      default:
        return state;
    }
  };
