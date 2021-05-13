import { combineReducers } from "redux";
import { StoreState } from "./interface";
import auth from "./auth";
import game from "./game";
import writeQuestion from "./writeQuestion";

export default combineReducers<StoreState>({
	auth,
	game,
	writeQuestion,
});

export * from "./interface";
