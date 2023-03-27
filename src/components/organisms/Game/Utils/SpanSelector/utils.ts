import { SelectionStates } from "./interface";

export const userInstructions = [
	["[[translation:948e93b8-77bb-453d-a604-af480a4998a0]]"],
	["[[translation:8e058ed8-7d7c-45ae-95ba-2fe3a227d6f1]]"],
	[
		"[[translation:fa7a48e5-0b40-4a24-9edb-ef614c645e13]]",
		"[[translation:34467789-f91f-47ae-bb80-5e93fc150f20]]",
	],
];

export const mapSelectionStatesToNum = (stage: SelectionStates) => {
	if (stage === "select-first") return 0;
	else if (stage === "select-last") return 1;
	return 2;
};
