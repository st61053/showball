import { AppAction } from "../global";
import { ISettingsState } from "./types";

const defaultState: ISettingsState = {
  serverPrefix: "https://showball-backend.vargaon.cz",
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
