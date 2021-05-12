import * as AuthActions from "./auth";
export enum ActionTypes {
	fetchUserFromToken,
	logOutUser,
	registerUser,
	fetchInvites,
}

export type Actions =
	| AuthActions.FetchUserFromTokenAction
	| AuthActions.LogOutUserAction
	| AuthActions.RegisterUserAction
	| AuthActions.FetchInvitesAction;
