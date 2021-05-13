import store from "../../../store";
import { StartWriteQuestionRoundFromAPI, TaskFromBackend } from "../../declerations";
import { ActionTypes } from "../types";
import {
	SetCurrentGameRoundAction,
	StartWriteQuestionRoundFromAPIAction,
} from "./interface";

const __handleUpdateTask = (data: TaskFromBackend) => {
	switch (data.taskInfo.type) {
		case "make-question":
			store.dispatch<StartWriteQuestionRoundFromAPIAction>({
				type: ActionTypes.startWriteQuestionRound,
				payload: data as StartWriteQuestionRoundFromAPI,
			});
			break;
		// 	case "verify-question":
		// 		store.dispatch<VerifyQuestionRoundFromAPIAction>({
		// 			type: ActionTypes.fetchVerifyQuestion,
		// 			payload: data as VerifyQuestionRoundFromAPI,
		// 		});
		// 		break;
		// 	case "find-article":
		// 		store.dispatch<FindArticleRoundFromAPIAction>({
		// 			type: ActionTypes.findArticle,
		// 			payload: data as FindArticleRoundFromAPI,
		// 		});
		// 		break;
		// 	case "locate-span":
		// 		store.dispatch<LocateSpanRoundFromAPIAction>({
		// 			type: ActionTypes.locateSpanInParagraph,
		// 			payload: data as LocateSpanRoundFromAPI,
		// 		});
		// 		break;
		// 	case "verify-span":
		// 		store.dispatch<VerifySpanRoundFromAPIAction>({
		// 			type: ActionTypes.verifySpanInAnswer,
		// 			payload: data as VerifySpanRoundFromAPI,
		// 		});
		// 		break;
		// 	case "completed":
		// 		store.dispatch<CompleteRoundFromAPIAction>({
		// 			type: ActionTypes.completeRound,
		// 		});
		// 		break;
		default:
			throw new Error("Unreachable statement in __handleUpdateTask");
	}
	store.dispatch<SetCurrentGameRoundAction>({
		type: ActionTypes.setCurrentGameRound,
		payload: data.currentRound,
	});
};

export * as Actions from "./interface";
