import { CheckListItem } from "./interface";

const getQuestions = (isYesOrNo: boolean): CheckListItem[] => [
	{
		title: "Lengd svars",
		description:
			"Ég held að það sé hægt að svara þessari spurningu í 1-2 setningum.",
		value: false,
	},
	// {
	// 	title: "Ætli það sé til svar?",
	// 	description: "Ég tel það nokkkuð líklegt að hægt sé að svara þessari spurningu",
	// 	value: false,
	// },
	{
		title: "Eitt mögulegt svar",
		description:
			"Ég held að svarið sé svipað, sama hvern maður spyr eða hvaða dag vikunnar er spurt.",
		value: false,
	},
	{
		title: "Hvernig er málfarið?",
		description:
			"Mér finnst málfarið vera í lagi. Það er hvorki lélegt né of formlegt.",
		value: false,
	},
	{
		title: "Skiljanleg spurning",
		description: "Það er skýrt hvað höfundur spurningarinnar á við.",
		value: false,
	},
	isYesOrNo
		? {
				title: "Þetta er já/nei spurning",
				description:
					"Það ætti að vera hægt að svara þessari spurningu með annaðhvort já eða nei",
				value: false,
		  }
		: {
				title: "Þetta er EKKI já/nei spurning",
				description:
					"Það er hvorki hægt að svara þessari spurningu með já eða nei",
				value: false,
		  },
];

export default getQuestions;
