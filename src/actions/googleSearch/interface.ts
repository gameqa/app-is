import { ActionTypes } from "../types";

export interface WriteGoogleQueryAction {
	type: ActionTypes.writeGoogleQuery;
	payload: string;
}
