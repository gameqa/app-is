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
		case ActionTypes.fetchMoreHighscoreUsersOnScrollUp:
			return {
				...state,
				highscores: [...state.highscores, ...action.payload],
			};
		case ActionTypes.fetchMoreHighscoreUsersOnScrollDown:
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
