import * as Auth from "./auth";
import * as Game from "./game";

export interface StoreState {
	auth: Auth.State;
	game: Game.State;
}
