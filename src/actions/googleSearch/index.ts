import { ActionTypes } from "../types";
import { WriteGoogleQueryAction } from "./interface";
import { Dispatch } from "redux";
import Api from "../../api";

export const writeGoogleQuery = (user: string): WriteGoogleQueryAction => {
	return {
		type: ActionTypes.writeGoogleQuery,
		payload: user,
	};
};

export * as Actions from "./interface";
