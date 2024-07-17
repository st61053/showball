import { AppAction } from "../global";
import { ISettingsState } from "./types";

const defaultState: ISettingsState = {
  serverPrefix: "http://backend/:8080",
};

export const settingsReducer = (
  state: ISettingsState = defaultState,
  action: AppAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};
