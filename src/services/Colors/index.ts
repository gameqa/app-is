import { ColorType } from "../../declerations";

type ColorMap = { [key in ColorType]: string };

export const MapToDark: ColorMap = {
	success: "#1bc5bd",
	danger: "#f64e60",
	highlight: "#8950fc",
	warning: "#ffa800",
};
export const MapToLight: ColorMap = {
	success: "#c9f7f5",
	danger: "#ffe2e5",
	highlight: "#eee5ff",
	warning: "#fff4de",
};
