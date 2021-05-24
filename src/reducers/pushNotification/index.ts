import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";

export const initialState: State = {
	hasPermission: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		default:
			return state;
	}
};
export default reducer;
export * from "./interface";
