import { ActionTypes } from "..";
import { StartWriteQuestionRoundFromAPI } from "../../declerations";

export interface StartWriteQuestionRoundFromAPIAction {
	type: ActionTypes.startWriteQuestionRound;
	payload: StartWriteQuestionRoundFromAPI;
}

export interface SetCurrentGameRoundAction {
	type: ActionTypes.setCurrentGameRound;
	payload: number;
}
