import { GameTypes } from "../../../../declerations";

export const getGameName = (type: GameTypes) => {
	switch (type) {
		case GameTypes.writeQuestion:
			return "BÚA TIL SPURNINGU";
		case GameTypes.questionQualityAssurance:
			return "FARA YFIR SPURNINGU";
		case GameTypes.submitArticle:
			return "FINNA SPURNINGU";
		case GameTypes.verifyAnswerLocation:
			return "FINNA SVAR";
		case GameTypes.verifyAnswerSpan:
			return "STAÐFESTA SVAR";
		case GameTypes.answerQualityAssurance:
			return "STAÐFESTA SVAR";
		default:
			return "";
	}
};
