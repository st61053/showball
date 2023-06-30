import { IToken } from "../tokens/types";
import { CHANGE_SELECTED_TOKEN } from "./constants";

export const changeSelectedToken = (token: IToken) => ({
    token,
    type: CHANGE_SELECTED_TOKEN
  });