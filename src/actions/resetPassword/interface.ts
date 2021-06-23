import { PrizeCategory } from "../../declerations";
import { ActionTypes } from "../types";

export interface RequestResetPasswordUserCodeAction {
	type: ActionTypes.requestResetPasswordUserCode;
}

export interface SetResetPasswordEmailAction {
	type: ActionTypes.setResetPasswordEmail;
    payload: string;
}

export interface RequestResetPasswordTokenAction {
	type: ActionTypes.requestResetPasswordToken;
    payload: string;
}

export interface ResetPasswordWithTokenAction {
	type: ActionTypes.resetPasswordWithToken;
}

