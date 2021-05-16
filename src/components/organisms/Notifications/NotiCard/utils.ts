import { ColorType } from "../../../../declerations";
import { NotiType } from "../interface";

type NotiTypeToIcon = {
	[k in NotiType]: {
		color: ColorType;
		icon: "thumbs-up" | "lightbulb-o" | "question";
	};
};

// question mark means that selecting
// icon has not been done

export const mapToIcon: NotiTypeToIcon = {
	error: {
		icon: "question",
		color: "danger",
	},
	idea: {
		icon: "lightbulb-o",
		color: "warning",
	},
	success: {
		icon: "thumbs-up",
		color: "success",
	},
	warning: {
		icon: "question",
		color: "warning",
	},
};
