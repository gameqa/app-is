import { GameTypes } from "../../declerations";

export interface State {
	current?: GameTypes;
	currentRound: number;
	totalRounds: number;
	_id: string;
	isLoading: boolean;
	lastLoaded: number; // date when last round was loaded
}
