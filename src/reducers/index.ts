import { combineReducers } from "redux";
import { StoreState } from "./interface";
import auth from "./auth";
import game from "./game";
import writeQuestion from "./writeQuestion";
import verifyQuestion from "./verifyQuestion";
import selectSpan from "./selectSpan";

export default combineReducers<StoreState>({
	auth,
	game,
	writeQuestion,
	verifyQuestion,
	selectSpan,
});

export * from "./interface";
