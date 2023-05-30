import { combineReducers } from "redux";
import { tokensReducer } from "./tokens/reducer";

export declare type partialReducer = (partialStore: object) => object;

export const createAppReducer = () => {
    return combineReducers({
        tokens: tokensReducer
    });
};