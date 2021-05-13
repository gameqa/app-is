import * as Auth from "./auth";
import * as Game from "./game";
import * as WriteQuestion from "./writeQuestion";

export interface StoreState {
	auth: Auth.State;
	game: Game.State;
	writeQuestion: WriteQuestion.State;
}
