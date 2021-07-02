import { ActionTypes } from "../types";
import { Dispatch } from "redux";
import Api from "../../api";
import { User } from "../../declerations";
import {
	FetchHighscorePlacementAction,
	FetchMoreHighscoreUsersOnScrollUpAction,
	FetchMoreHighscoreUsersOnScrollDownAction,
} from "./interface";

export const fetchHighscorePlacement = () => {
	return async function (dispatch: Dispatch) {
		try {
			const { data } = await Api.get<User[]>(
				"/api/v1/users/hiscore_placement"
			);
			dispatch<FetchHighscorePlacementAction>({
				type: ActionTypes.fetchHighscorePlacement,
				payload: data,
			});
		} catch (error) {
			// do nothing on error
		}
	};
};

export const fetchMoreHighscoreUsersOnScrollUp = () => {
	return async function (dispatch: Dispatch) {
		try {
			const { data } = await Api.get<User[]>(
				"/api/v1/users/hiscore_placement/load_more_up"
			);
			dispatch<FetchMoreHighscoreUsersOnScrollUpAction>({
				type: ActionTypes.fetchMoreHighscoreUsersOnScrollUp,
				payload: data,
			});
		} catch (error) {
			//
		}
	};
};

export const fetchMoreHighscoreUsersOnScrollDown = () => {
	return async function (dispatch: Dispatch) {
		try {
			const { data } = await Api.get<User[]>(
				"/api/v1/users/hiscore_placement/load_more_down"
			);
			dispatch<FetchMoreHighscoreUsersOnScrollDownAction>({
				type: ActionTypes.fetchMoreHighscoreUsersOnScrollDown,
				payload: data,
			});
		} catch (error) {
			//
		}
	};
};

export * as Actions from "./interface";
