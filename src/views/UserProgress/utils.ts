export interface ButtonItem {
	text: string;
	emoji: string;
	screenId: Screens;
}

export type Screens = "answer" | "in-progress" | "no-answers";

export const BUTTONS: ButtonItem[] = [
	{
		text: "Svör",
		emoji: "💡",
		screenId: "answer",
	},
	{
		text: "Í vinnslu",
		emoji: "⌛",
		screenId: "in-progress",
	},
	{
		text: "Ekkert svar",
		emoji: "🙅‍♀️",
		screenId: "no-answers",
	},
];
