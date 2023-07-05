import { IToken } from "../tokens/types";
import { ADD_COIN, ADD_TOKEN, CAN_SPIN, LOGIN_PLAYER, LOGOUT_PLAYER } from "./constants";
import { IPlayer } from "./types";

export const loginPlayer = (player: IPlayer) => ({
  player,
  type: LOGIN_PLAYER,
});

export const logoutPlayer = () => ({
  type: LOGOUT_PLAYER,
});

export const addCoin = (count: number) => ({
  count,
  type: ADD_COIN,
});

export const addToken = (token: IToken) => ({
  token,
  type: ADD_TOKEN
});

export const canSpin = (spin: boolean) => ({
  spin,
  type: CAN_SPIN
});
