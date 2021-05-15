import * as Auth from "./auth";
import * as Game from "./game";
import * as WriteQestion from "./writeQuestion";
import * as SelectSpan from "./selectSpan";
import * as Notifications from "./notification";

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
	addNotificationItem,
	addPriorityNotificationItem,
	clearNotificationItemsById,
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
	| SelectSpan.Actions.ClearIndexRangeInParagraph
	| SelectSpan.Actions.SelectFirstWordIndexInParagraphAction
	| SelectSpan.Actions.SelectSecondWordIndexInParagraphAction
	| Notifications.Actions.AddNotificationItemAction
	| Notifications.Actions.AddPriorityNotificationItemAction
	| Notifications.Actions.ClearNotificationItemsByIdAction;
