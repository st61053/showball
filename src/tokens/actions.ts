import { CHANGE_SELECTED_TOKEN } from "./constants";
import { IToken } from "./types";

export const changeSelectedToken = (token: IToken) => ({
    token,
    type: CHANGE_SELECTED_TOKEN
  });