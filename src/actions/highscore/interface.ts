import { User } from "../../declerations";
import { ActionTypes } from "../types";

export interface FetchHighscorePlacementAction {
	type: ActionTypes.fetchHighscorePlacement;
	payload: User[];
}

export interface FetchMoreHighscoreUsersOnScrollUpAction {
	type: ActionTypes.fetchMoreHighscoreUsersOnScrollUp;
	payload: User[];
}

export interface FetchMoreHighscoreUsersOnScrollDownAction {
	type: ActionTypes.fetchMoreHighscoreUsersOnScrollDown;
	payload: User[];
}
