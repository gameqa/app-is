import { ActionTypes } from "../types";
import { ScoreCard, User } from "../../declerations";

export interface FetchUserFromTokenAction {
	type: ActionTypes.fetchUserFromToken;
	payload: User;
}

export interface LogOutUserAction {
	type: ActionTypes.logOutUser;
}

export interface RegisterUserAction {
	type: ActionTypes.registerUser;
	payload: User;
}

export interface FetchInvitesAction {
	type: ActionTypes.fetchInvites;
	payload: User[];
}

// export interface ResetPasswordCodeAction {
// 	type: ActionTypes.resetPasswordUserCode;
// 	payload: String;
// }

// export interface ResetPasswordTokenAction {
// 	type: ActionTypes.resetPasswordUserToken;
// 	payload: String;
// }

