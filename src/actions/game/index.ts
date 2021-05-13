import { Dispatch } from "redux";
import store from "../../../store";
import {
	StartGoogleSearchRoundFromAPI,
	StartSelectSpanRoundFromAPI,
	StartVerifyQuestionRoundFromAPI,
	StartVerifySpanRoundFromAPI,
	StartWriteQuestionRoundFromAPI,
	TaskFromBackend,
} from "../../declerations";
import { ActionTypes } from "../types";
import {
	SetCurrentGameRoundAction,
	StartWriteQuestionRoundFromAPIAction,
	SetGameLoadingStateAction,
	StartVerifyQuestionRoundFromAPIAction,
	StartGoogleSearchRoundFromAPIAction,
	StartSelectSpanRoundFromAPIAction,
	StartVerifySpanRoundFromAPIAction,
	StartCompletedViewRoundFromAPIAction,
} from "./interface";
import Api from "../../api";

const __handleUpdateTask = (data: TaskFromBackend) => {
	switch (data.taskInfo.type) {
		case "make-question":
			store.dispatch<StartWriteQuestionRoundFromAPIAction>({
				type: ActionTypes.startWriteQuestionRound,
				payload: data as StartWriteQuestionRoundFromAPI,
			});
			break;
		case "verify-question":
			store.dispatch<StartVerifyQuestionRoundFromAPIAction>({
				type: ActionTypes.startVerifyQuestionRound,
				payload: data as StartVerifyQuestionRoundFromAPI,
			});
			break;
		case "find-article":
			store.dispatch<StartGoogleSearchRoundFromAPIAction>({
				type: ActionTypes.startGoogleSearchRound,
				payload: data as StartGoogleSearchRoundFromAPI,
			});
			break;
		case "locate-span":
			store.dispatch<StartSelectSpanRoundFromAPIAction>({
				type: ActionTypes.startSelectSpanRound,
				payload: data as StartSelectSpanRoundFromAPI,
			});
			break;
		case "verify-span":
			store.dispatch<StartVerifySpanRoundFromAPIAction>({
				type: ActionTypes.startVerifySpanRound,
				payload: data as StartVerifySpanRoundFromAPI,
			});
			break;
		case "completed":
			store.dispatch<StartCompletedViewRoundFromAPIAction>({
				type: ActionTypes.startCompletedViewRound,
			});
			break;
		default:
			throw new Error("Unreachable statement in __handleUpdateTask");
	}
	store.dispatch<SetCurrentGameRoundAction>({
		type: ActionTypes.setCurrentGameRound,
		payload: data.currentRound,
	});
};

export const fetchCurrentGameRound = () => {
	return async function (dispatch: Dispatch) {
		try {
			dispatch<SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: true,
			});
			const { data } = await Api.get<TaskFromBackend>("/api/v1/game_rounds/current");
			__handleUpdateTask(data);
		} catch (error) {
			console.log(error);
		} finally {
			dispatch<SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: false,
			});
		}
	};
};

export * as Actions from "./interface";
