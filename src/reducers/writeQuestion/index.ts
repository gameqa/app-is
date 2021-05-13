import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";

export const initialState: State = {
	ideaWords: [],
	questionType: "",
	question: "",
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.startWriteQuestionRound:
			return {
				...state,
				...action.payload.taskInfo,
				question: "",
			};
		case ActionTypes.writeQuestion:
			return {
				...state,
				question: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
export * from "./interface";
