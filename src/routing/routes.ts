import { StackRoutes, TabRoutes } from "./declerations";
import * as Views from "../views";

export const tab: TabRoutes[] = [
	{
		id: "progress",
		Component: Views.UserProgress,
	},
	{
		id: "game",
		Component: Views.UserProgress,
	},
	{
		id: "invite",
		Component: Views.UserProgress,
	},
	{
		id: "prizes",
		Component: Views.UserProgress,
	},
];

export const stack: StackRoutes[] = [
	{
		id: "log-in",
		Component: Views.Authenticate,
	},
	{
		id: "sign-up",
		Component: Views.Register,
	},
];
