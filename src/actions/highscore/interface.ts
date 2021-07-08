import { User } from "../../declerations";
import { ActionTypes } from "../types";

export interface FetchHighscorePlacementAction {
	type: ActionTypes.fetchHighscorePlacement;
	payload: User[];
}

export interface FetchHighscorePlacementExpansionAction {
	type: ActionTypes.fetchHighscorePlacementExpansion;
	payload: User[];
}
