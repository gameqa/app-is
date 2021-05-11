import * as AuthActions from "./auth";
export enum ActionTypes {
	fetchUserFromToken,
	logOutUser,
}

export type Actions =
	| AuthActions.FetchUserFromTokenAction
	| AuthActions.LogOutUserAction;
