import { CheckListItem } from "./interface";

const getQuestions = (isYesOrNo: boolean): CheckListItem[] => [
	{
		title: "Lengd svars",
		description:
			"Ég held að það sé hægt að svara þessari spurningu í 2-3 setningum eða styttra.",
		value: false,
		badQuestionPrompt: "Heldur þú að svarið sé svona langt?",
	},
	{
		title: "Svarið breytist ekki mikið",
		description:
			"Ég held að svarið sé svipað, sama hvern maður spyr eða hvaða dag vikunnar er spurt.",
		value: false,
		badQuestionPrompt: "Er svarið mismunandi milli aðstæða?",
	},
	{
		title: "Skiljanleg spurning",
		description: "Það er skýrt hvað höfundur spurningarinnar á við.",
		value: false,
		badQuestionPrompt: "Finnst þér spurningin vera óskiljanleg?",
	},
	isYesOrNo
		? {
				title: "Þetta er já/nei spurning",
				description:
					"Það ætti að vera hægt að svara þessari spurningu með annaðhvort já eða nei",
				value: false,
				badQuestionPrompt:
					"Er svarið við spurningunni hvorki já eða nei?",
		  }
		: {
				title: "Þetta er EKKI já/nei spurning",
				description:
					"Það er hvorki hægt að svara þessari spurningu með já eða nei",
				value: false,
				badQuestionPrompt:
					"Er svarið við spurningunni já eða nei?",
		  },
];

export default getQuestions;
