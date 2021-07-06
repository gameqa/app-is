import { Question } from "../../declerations";
import { ActionTypes } from "../types";

export interface FetchMyQuestionsAction {
	type: ActionTypes.fetchMyQuestions;
	payload: Question[];
}
