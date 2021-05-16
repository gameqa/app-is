import { GameTypes } from "../../../declerations";
import WriteQuestion from "./WriteQuestion";
import GoogleSearch from "./GoogleSearch";
import ReviewAnswer from "./ReviewAnswer";
import SelectSpan from "./SelectSpan";
import ReviewQuestion from "./ReviewQuestion";
export * as Utils from "./Utils";

interface GameRound {
	Component: () => JSX.Element;
	type: GameTypes;
}

const Rounds: GameRound[] = [
	{
		Component: WriteQuestion,
		type: GameTypes.writeQuestion,
	},
	{
		Component: ReviewQuestion,
		type: GameTypes.questionQualityAssurance,
	},
	{
		Component: GoogleSearch,
		type: GameTypes.submitArticle,
	},
	{
		Component: ReviewAnswer,
		type: GameTypes.verifyAnswerSpan,
	},
	{
		Component: SelectSpan,
		type: GameTypes.verifyAnswerLocation,
	},
];

export default Rounds;
