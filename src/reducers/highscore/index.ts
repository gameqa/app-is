import { Actions, ActionTypes } from "../../actions";
import { State } from "./interface";

export const initialState: State = {
	highscores: [],
	isLoading: true,
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.fetchHighscorePlacement:
			return {
				...state,
				highscores: [...state.highscores, ...action.payload],
				isLoading: false,
			};

		case ActionTypes.fetchHighscorePlacementExpansion:
			return {
				...state,
				highscores: [...state.highscores, ...action.payload],
				isLoading: false,
			};

		default:
			return state;
	}
};

export default reducer;

export * from "./interface";
