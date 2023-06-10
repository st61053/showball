import { combineReducers } from "redux";
import { tokensReducer } from "./tokens/reducer";
import { storeReducer } from "./store/reducer";

export declare type partialReducer = (partialStore: object) => object;

export const createAppReducer = () => {
    return combineReducers({
        tokens: tokensReducer,
        store: storeReducer
    });
};