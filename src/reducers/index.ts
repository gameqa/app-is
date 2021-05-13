import { combineReducers } from "redux";
import { StoreState } from "./interface";
import auth from "./auth";
import game from "./game";

export default combineReducers<StoreState>({
	auth,
	game,
});

export * from "./interface";
