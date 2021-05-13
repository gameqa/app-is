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
		Component: Views.Invite,
	},
	{
		id: "prizes",
		Component: Views.Prizes,
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
