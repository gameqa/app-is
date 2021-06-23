import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";

export const initialState: State = {
	resetCode: ""
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.requestResetPasswordUserCode:
			return {
				...state,
				resetCode: "",
				resetToken: undefined
			}
		case ActionTypes.setResetPasswordEmail:
			return {
				...state,
				email: action.payload
			}
		default:
			return state;
	}
};

export default reducer;
export * from "./interface";
