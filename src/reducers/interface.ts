import * as Auth from "./auth";
import * as Game from "./game";
import * as WriteQuestion from "./writeQuestion";
import * as VerifyQuestion from "./verifyQuestion";

export interface StoreState {
	auth: Auth.State;
	game: Game.State;
	writeQuestion: WriteQuestion.State;
	verifyQuestion: VerifyQuestion.State;
}
