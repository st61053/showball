import { AppAction } from "../global";
import { ADD_COIN, ADD_TOKEN, CAN_SPIN, GET_PLAYERS, LOGIN_PLAYER, LOGOUT_PLAYER } from "./constants";
import { IPlayer, IPlayerState } from "./types";

export const DEFAULT_PLAYER : IPlayer = {
  id: "",
  name: "",
  title: "",
  stats: {
    points: 0,
    coins: 0,
    strike: 0,
  },
  tokens: []
};

const defaultState: IPlayerState = {
    players: [],
    loginPlayer: DEFAULT_PLAYER,
    isLoggedIn: false,
    spin: false,
  };

  export const playersReducer = (
    state: IPlayerState = defaultState,
    action: AppAction
  ) => {
    switch (action.type) {
      case ADD_COIN: 
      return {
        ...state,
        loginPlayer: {
          ...state.loginPlayer,
          stats: {
            ...state.loginPlayer?.stats,
            coins: action.count ? state.loginPlayer?.stats.coins + action.count : state.loginPlayer?.stats.coins,
          }
        }
      }
      case LOGIN_PLAYER: 
      return {
        ...state,
        loginPlayer: action.player,
        isLoggedIn: true
      }
      case LOGOUT_PLAYER: 
      return {
        ...state,
        loginPlayer: DEFAULT_PLAYER,
        isLoggedIn: false
      }
      case ADD_TOKEN: 
      return {
        ...state,
        loginPlayer: {
          ...state.loginPlayer,
          tokens: state.loginPlayer.tokens.map((token) => token.tokenId === action.token?.id ? ({
            ...token,
            count: token.count + 1,
            straight: true
          }) : (token))
        }
      }
      case CAN_SPIN: 
      return {
        ...state,
        spin: action.spin
      }
      case GET_PLAYERS: 
      return {
        ...state,
        players: action.players
      }
      default:
        return state;
    }
  };
