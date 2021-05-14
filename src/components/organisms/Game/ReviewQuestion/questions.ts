import { CheckListItem } from "./interface";

const items: CheckListItem[] = [
	{
		title: "Lengd svars",
		description: "Ég held að það sé hægt að svara þessari spurningu í 1-2 setningum",
		value: false,
	},
	{
		title: "Ætli það sé til svar",
		description:
			"Ég tel það vera nokkkuð líklegt að það sé hægt að svara þessari spurningu",
		value: false,
	},
	{
		title: "Eitt svar eða mörg",
		description:
			"Ég held að svarið sé eins sama hvern maður spyr, eða hvaða dag vikunnar er  spurt",
		value: false,
	},
	{
		title: "Hvernig er málfarið",
		description: "Mér finnst málfarið vera í lagi. Það er hvorki lélegt né of formlegt",
		value: false,
	},
	{
		title: "Er þetta surning",
		description:
			"Þetta er alveg greinilega spurning og ég skil hvað höfundur spurningarinnar á við.",
		value: false,
	},
];

export default items;
