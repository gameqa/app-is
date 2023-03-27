import { QuestionWithAnswers } from "../../declerations";

export interface ButtonItem {
	text: string;
	emoji: string;
	screenId: Screens;
}

export type Screens = "answer" | "in-progress" | "no-answers";

export const BUTTONS: ButtonItem[] = [
	{
		text: "[[translation:7923fe3c-e9c7-44cb-bdf0-dad4c39b8daf]]",
		emoji: "💡",
		screenId: "answer",
	},
	{
		text: "[[translation:728c9365-2e4f-41e9-84ed-2c375c5044a5]]",
		emoji: "⌛",
		screenId: "in-progress",
	},
	{
		text: "[[translation:c35d4988-1f40-401b-88a8-552871a987cd]]",
		emoji: "[[translation:3b44ed43-0d08-4095-b9ec-f442f545b73a]]",
		screenId: "no-answers",
	},
];

export const FILTER_HAS_ANSWER = (question: QuestionWithAnswers) =>
	question.answers.length;

export const FILTER_HAS_NO_ANSWER = (question: QuestionWithAnswers) =>
	question.archived || question.archived;

export const FILTER_IS_IN_PROGRESS = (question: QuestionWithAnswers) =>
	question.answers.length === 0 && !question.archived;
