import { ActionTypes } from "../types";
import { FetchUserFromTokenAction, LogOutUserAction } from "./interface";
import { ScoreCard, User } from "../../declerations";
import { Dispatch } from "redux";
import Api from "../../api";

export const fetchUserFromToken = () => {
	return async function (dispatch: Dispatch) {
		try {
			const res = await Api.get<User>("/api/v1/users/current");
			dispatch<FetchUserFromTokenAction>({
				type: ActionTypes.fetchUserFromToken,
				payload: res.data,
			});
		} catch (error) {
			dispatch<LogOutUserAction>({
				type: ActionTypes.logOutUser,
			});
		}
	};
};

export const logOutUser = () => {
	return async function (dispatch: Dispatch) {
		try {
			await Api.delete("/api/v1/users/current/auth_token");
			dispatch<LogOutUserAction>({
				type: ActionTypes.logOutUser,
			});
		} catch (error) {
			//
		}
	};
};

export * from "./interface";