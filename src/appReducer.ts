import { combineReducers } from "redux";
import { playersReducer } from "./players/reducer";

export declare type partialReducer = (partialStore: object) => object;

export const createAppReducer = () => {
    return combineReducers({
        players: playersReducer
    });
};