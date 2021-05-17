import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";

export const initialState: State = {
	articles: [],
	query: "",
	searchError: false,
	noResults: false,
	isLoading: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.writeGoogleQuery:
			return { ...state, query: action.payload };

		case ActionTypes.fetchArticlesQuery: {
			return {
				...state,
				articles: action.payload,
				searchError: false,
				noResults: action.payload.length === 0,
			};
		}
		case ActionTypes.setGoogleSearchError:
			return {
				...state,
				searchError: true,
				articles: [],
			};
		default:
			return state;
	}
};

export default reducer;

export * from "./interface";
