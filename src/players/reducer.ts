import { AppAction } from "../global";
import { COUNTER } from "./constants";
import { IPlayer, IPlayerState } from "./types";
import matej from "../images/players/matej_v2.png";


const LOGIN_PLAER : IPlayer = {
  id: 0,
  name: "Matěj",
  img: matej,
  stats: {
    points: 72,
    coins: 55,
    strike: 5,
  }
}

const defaultState: IPlayerState = {
    players: [],
    loginPlayer: LOGIN_PLAER,
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
