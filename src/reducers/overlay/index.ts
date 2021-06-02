import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";
import { OverlayType } from "../../declerations";

export const initialState: State = {
	queue: [OverlayType.confetti],
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		default:
			return state;
	}
};

export default reducer;
export * from "./interface";
