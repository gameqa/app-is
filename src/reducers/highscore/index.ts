import { Actions, ActionTypes } from "../../actions";
import { State } from "./interface";

export const initialState: State = {
	highscores: [],
	isLoading: true,
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.fetchHighscorePlacement:
			const newHighscores = [...state.highscores, ...action.payload];
			return {
				...state,
				highscores: [...new Set(newHighscores)],
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
