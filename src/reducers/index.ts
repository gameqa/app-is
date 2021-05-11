import { combineReducers } from "redux";
import auth from "./auth";
import { StoreState } from "./interface";

export default combineReducers<StoreState>({
	auth,
});

export * from "./interface";
