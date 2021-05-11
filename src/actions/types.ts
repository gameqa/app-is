import * as AuthActions from "./auth";
export enum ActionTypes {
	fetchUserFromToken,
	logOutUser,
	registerUser,
}

export type Actions =
	| AuthActions.FetchUserFromTokenAction
	| AuthActions.LogOutUserAction
	| AuthActions.RegisterUserAction;
