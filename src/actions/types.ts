import * as Auth from "./auth";
import * as Game from "./game";
import * as WriteQestion from "./writeQuestion";
import * as SelectSpan from "./selectSpan";
import * as Notifications from "./notification";
import * as GoogleSearch from "./GoogleSearch";
import * as ArticleReader from "./articleReader";
import * as AuthCode from "./authCode";
import * as ChartData from "./chartData";
import * as PushNotification from "./pushNotification";
import * as PrizeCategory from "./prize";
import * as Overlay from "./overlay";
import * as Motivation from "./motivation";
import * as Advertisement from "./advertisement";
import * as DeepLinks from "./deepLinks";

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
	clearNotifications,
	writeGoogleQuery,
	fetchArticlesQuery,
	setGoogleSearchError,
	fetchArticleParagraphs,
	setArticleReaderError,
	writeAuthCode,
	setAuthCodeErrorMessage,
	setAuthCodeLoading,
	fetchAnswersPerDay,
	sendPushNotificationToken,
	fetchPrizeCategories,
	enqueOverlay,
	dequeOverlay,
	fetchRandomPrize,
	pushOverlay,
	fetchMotivation,
	clearMotivation,
	refreshAskAboutImage,
	setLink,
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
	| WriteQestion.Actions.RefreshAskAboutImageAction
	| SelectSpan.Actions.ClearIndexRangeInParagraph
	| SelectSpan.Actions.SelectFirstWordIndexInParagraphAction
	| SelectSpan.Actions.SelectSecondWordIndexInParagraphAction
	| Notifications.Actions.AddNotificationItemAction
	| Notifications.Actions.ClearNotifications
	| GoogleSearch.Actions.WriteGoogleQueryAction
	| GoogleSearch.Actions.SetSearchErrorAction
	| GoogleSearch.Actions.FetchArticlesQueryAction
	| ArticleReader.Actions.FetchArticleParagraphsAction
	| ArticleReader.Actions.SetArticleReaderErrorAction
	| AuthCode.Actions.WriteAuthCodeAction
	| AuthCode.Actions.SetAuthCodeErrorMessageAction
	| AuthCode.Actions.SetAuthCodeLoadingAction
	| ChartData.Actions.FetchAnswersPerDayAction
	| PushNotification.Actions.SendPushNotificationTokenAction
	| PrizeCategory.FetchPrizeCategoriesAction
	| Overlay.Actions.DequeOverlayAction
	| Overlay.Actions.EnqueOverlayAction
	| Advertisement.Actions.FetchRandomPrize
	| Overlay.Actions.PushOverlayAction
	| Motivation.Actions.FetchMotivationAction
	| DeepLinks.Actions.SetLink;
