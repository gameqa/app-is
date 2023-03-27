import {
	ICON_LVL_1,
	ICON_LVL_2,
	ICON_LVL_3,
	ICON_LVL_4,
	ICON_LVL_5,
	ICON_LVL_6,
	ICON_LVL_7,
} from "../../static";

const LEVEL_NAMES = [
	"[[translation:1e33cec2-ccd7-47b8-bf86-e41ffa849df4]]",
	"[[translation:9df058c6-a144-4b75-976a-2997f67f7349]]",
	"[[translation:34f440f1-c872-4118-8f9b-d0ed5cefd6a1]]",
	"[[translation:56f24152-d8fd-4d86-8cbc-66ddcdb269e6]]",
	"[[translation:9010208c-3c45-4358-87a1-a61ea3252037]]",
	"[[translation:c3d4773c-75ad-4240-9657-b5e221c94d74]]",
	"[[translation:3dda0399-962d-4862-ac77-c124e033029a]]",
];

const LEVEL_ICONS = [
	ICON_LVL_1,
	ICON_LVL_2,
	ICON_LVL_3,
	ICON_LVL_4,
	ICON_LVL_5,
	ICON_LVL_6,
	ICON_LVL_7,
];

export const mapLevelToString = (level: number) => {
	const string = LEVEL_NAMES[Math.floor(level / 3)];
	if (string === undefined) return "[[translation:239e14d4-ee59-4ec9-8977-7c3daba674fa]]";
	return string;
};

export const mapLevelToIconURL = (level: number) => {
	const URL = LEVEL_ICONS[Math.floor(level / 3)];
	if (URL === undefined) return "https://picsum.photos/70/70";
	return URL;
};
