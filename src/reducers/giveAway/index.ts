import { Actions, ActionTypes } from "../../actions";
import { State } from "./interface";

export const initialState: State = {
	giveAways: [],
};

export const reducer = (
	state: State = initialState,
	action: Actions
): State => {
	switch (action.type) {
		case ActionTypes.fetchGiveAways:
			const newState = { ...state, giveAways: [...action.payload] };
			console.log("giveaways!!!", newState);
			return newState;
		default:
			return state;
	}
};

export default reducer;

export * from "./interface";
