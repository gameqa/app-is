import * as Auth from "./auth";
import * as Game from "./game";
import * as WriteQestion from "./writeQuestion";
import * as SelectSpan from "./selectSpan";

export enum ActionTypes {
	fetchUserFromToken,
	logOutUser,
	registerUser,
	fetchInvites,
	startWriteQuestionRound, // create question task
	startVerifyQuestionRound, // verify qestion task
	startSelectSpanRound, // select span task
	startGoogleSearchRound, // start google search round
	startVerifySpanRound, // start verify question round
	startCompletedViewRound,
	setCurrentGameRound,
	setGameLoadingState,
	writeQuestion,
	selectFirstWordIndexInParagraph,
	selectSecondWordIndexInParagraph,
	clearIndexRangeInParagraph,
}

export type Actions =
	| Auth.Actions.FetchUserFromTokenAction
	| Auth.Actions.LogOutUserAction
	| Auth.Actions.RegisterUserAction
	| Auth.Actions.FetchInvitesAction
	| Game.Actions.SetCurrentGameRoundAction
	| Game.Actions.StartWriteQuestionRoundFromAPIAction
	| Game.Actions.StartVerifyQuestionRoundFromAPIAction
	| Game.Actions.StartSelectSpanRoundFromAPIAction
	| Game.Actions.StartVerifySpanRoundFromAPIAction
	| Game.Actions.StartGoogleSearchRoundFromAPIAction
	| Game.Actions.StartCompletedViewRoundFromAPIAction
	| Game.Actions.SetGameLoadingStateAction
	| WriteQestion.Actions.WriteQuestionAction
	| SelectSpan.ClearIndexRangeInParagraph
	| SelectSpan.SelectFirstWordIndexInParagraphAction
	| SelectSpan.SelectSecondWordIndexInParagraphAction;
