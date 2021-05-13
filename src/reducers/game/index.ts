import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";
import { GameTypes } from "../../declerations";

export const initialState: State = {
	currentRound: 0,
	totalRounds: 10,
	_id: "",
	isLoading: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.setCurrentGameRound:
			return {
				...state,
				currentRound: action.payload,
			};
		case ActionTypes.startWriteQuestionRound:
			return {
				...state,
				...action.payload,
				current: GameTypes.writeQuestion,
			};
		// case ActionTypes.fetchVerifyQuestion:
		// 	return {
		// 		...state,
		// 		...action.payload,
		// 		current: GameTypes.questionQualityAssurance,
		// 	};
		// case ActionTypes.findArticle:
		// 	return {
		// 		...state,
		// 		...action.payload,
		// 		current: GameTypes.submitArticle,
		// 	};
		// case ActionTypes.locateSpanInParagraph:
		// 	return {
		// 		...state,
		// 		...action.payload,
		// 		current: GameTypes.verifyAnswerLocation,
		// 	};
		// case ActionTypes.verifySpanInAnswer:
		// 	return {
		// 		...state,
		// 		...action.payload,
		// 		current: GameTypes.verifyAnswerSpan,
		// 	};
		// case ActionTypes.completeRound: {
		// 	return {
		// 		...state,
		// 		currentRound: state.totalRounds,
		// 		current: GameTypes.completed,
		// 	};
		// }
		// case ActionTypes.setGameLoadingState: {
		// 	return {
		// 		...state,
		// 		isLoading: action.payload,
		// 	};
		// }
		// case ActionTypes.setShowAvatarInHeader: {
		// 	return {
		// 		...state,
		// 		showAvatarInHeader: action.payload,
		// 	};
		// }
		default:
			return state;
	}
};

export default reducer;

export * from "./interface";
