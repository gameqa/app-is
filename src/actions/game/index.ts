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
import { AxiosResponse } from "axios";

const __handleUpdateTask = (data: TaskFromBackend) => {
	console.log(`__handleUpdateTask data`, data);
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

export const fetchCurrentGameRound = () =>
	async function (dispatch: Dispatch) {
		try {
			dispatch<SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: true,
			});
			const { data } = await Api.get<TaskFromBackend>("/api/v1/game_rounds/current");
			__handleUpdateTask(data);
		} catch (error) {
		} finally {
			dispatch<SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: false,
			});
		}
	};

/**
 * reusable function that uses generics
 * and polymorphism to be able to call
 * the advance logic in the backend from
 * various game rounds and handles
 * updating the game state based on the
 * response which is not dependent on
 * which round is being completed at each
 * moment
 * @param cb axios call
 * @returns void
 */
export const gameActionWrapperFunc = (
	cb: (d: Dispatch) => Promise<AxiosResponse<TaskFromBackend>>
) => {
	return async function (_dispatch: Dispatch) {
		try {
			_dispatch<SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: true,
			});
			const { data } = await cb(_dispatch);
			__handleUpdateTask(data);
		} catch (e) {
			// do nothing on error
		} finally {
			// release loading in both cases
			_dispatch<SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: false,
			});
		}
	};
};

export const submitQuestion = (
	gameRoundId: string,
	questionText: string,
	isYesOrNo: boolean
) =>
	gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "make-question",
			text: questionText,
			isYesOrNo,
		})
	);

export const submitVerifyQuestion = (
	gameRoundId: string,
	questionId: string,
	isGood: boolean
) =>
	gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "verify-question",
			questionId,
			archive: !isGood,
		})
	);

export const archiveAnswer = (gameRoundId: string, answerId: string) =>
	gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "archive-answer",
			answerId,
		})
	);

export const submitSpan = (
	gameRoundId: string,
	answerId: string,
	firstWord?: number,
	lastWord?: number
) =>
	gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "locate-span",
			answerId,
			firstWord,
			lastWord,
		})
	);

export const verifyAnswerSpan = (
	gameRoundId: string,
	answerId: string,
	canBeShortened?: boolean
) =>
	gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "verify-span",
			_id: answerId,
			canBeShortened,
		})
	);

export const markQuestionAsImpossible = (gameRoundId: string, questionId: string) => {
	return gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "mark-question-impossible",
			questionId,
		})
	);
};
export const verifyYesNoQuestion = (
	gameRoundId: string,
	answerId: string,
	answer: boolean
) =>
	gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "verify-yes-no-answer-paragraph",
			answerId,
			answer,
		})
	);

export const submitArticleAndParagraph = (
	gameRoundId: string,
	identifier: string,
	key: string,
	questionId: string,
	paragraphIndex: number
) =>
	gameActionWrapperFunc((_dispatch: Dispatch) =>
		Api.post<TaskFromBackend>(`/api/v1/game_rounds/${gameRoundId}/advance`, {
			type: "find-article",
			identifier,
			questionId,
			key,
			paragraphIndex,
		})
	);

export * as Actions from "./interface";
