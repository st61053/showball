import { combineReducers } from "redux";
import { tokensReducer } from "./tokens/reducer";
import { storeReducer } from "./store/reducer";
import { playersReducer } from "./players/reducer";
import { settingsReducer } from "./settings/reduce";

export declare type partialReducer = (partialStore: object) => object;

export const createAppReducer = () => {
    return combineReducers({
        players: playersReducer,
        tokens: tokensReducer,
        store: storeReducer,
        settings: settingsReducer
    });
};