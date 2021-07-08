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
				highscores: action.payload,
				isLoading: false,
			};

		case ActionTypes.fetchHighscorePlacementExpansionUp:
			return {
				...state,
				highscores: [...action.payload, ...state.highscores],
				isLoading: false,
			};
		case ActionTypes.fetchHighscorePlacementExpansionDown:
			return {
				...state,
				highscores: [...state.highscores, ...action.payload],
			};
		default:
			return state;
	}
};

export default reducer;

export * from "./interface";
