import { Actions, ActionTypes } from "../../actions";
import { State } from "./interface";

export const initialState: State = {
	info: { time: 0, items: [] },
};

export const reducer = (
	state: State = initialState,
	action: Actions
): State => {
	switch (action.type) {
		case ActionTypes.fetchGiveAways:
			console.log("giveaways!!!", action.payload);
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default reducer;

export * from "./interface";
