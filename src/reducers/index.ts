import { combineReducers } from "redux";
import { StoreState } from "./interface";
import auth from "./auth";
import game from "./game";
import writeQuestion from "./writeQuestion";
import verifyQuestion from "./verifyQuestion";
import selectSpan from "./selectSpan";
import notification from "./notification";
import googleSearch from "./googleSearch";
import articleReader from "./articleReader";
import authCode from "./authCode";

export default combineReducers<StoreState>({
	auth,
	game,
	writeQuestion,
	verifyQuestion,
	selectSpan,
	notification,
	googleSearch,
	articleReader,
	authCode,
});

export * from "./interface";
