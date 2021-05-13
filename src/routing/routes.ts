import { AuthStackRoutes, PrizeStackRoutes, TabRoutes } from "./declerations";
import * as Views from "../views";

export const tab: TabRoutes[] = [
	{
		id: "progress",
		Component: Views.UserProgress,
	},
	{
		id: "game",
		Component: Views.Game,
	},
	{
		id: "invite",
		Component: Views.Invite,
	},
];

export const prizeStack: PrizeStackRoutes[] = [
	{
		id: "prize-cats",
		Component: Views.PrizeCategories,
	},
	{
		id: "prize-items",
		Component: Views.PrizeItems,
	},
];

export const authStack: AuthStackRoutes[] = [
	{
		id: "log-in",
		Component: Views.Authenticate,
	},
	{
		id: "sign-up",
		Component: Views.Register,
	},
];
