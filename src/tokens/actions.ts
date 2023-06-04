import { CHANGE_SELECTED_TOKEN, LOAD_TOKENS } from "./constants";
import { IToken } from "./types";

export const changeSelectedToken = (token: IToken) => ({
    token,
    type: CHANGE_SELECTED_TOKEN
  });

  export const loadTokens = (tokens: IToken[]) => ({
    tokens,
    type: LOAD_TOKENS
  });