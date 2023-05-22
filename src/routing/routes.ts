import {
	AuthStackRoutes,
	PrizeStackRoutes,
	TabRoutes,
	GameStackRoutes,
	ProfileStackRoutes,
} from "./declerations";
import * as Views from "../views";

export const tab: TabRoutes[] = [
	{
		id: "[[translation:27d82309-5af5-4387-8151-15bdbadf719b]]",
		Component: Views.Invite,
	},
	{
		id: "[[translation:ffa22022-0151-47c4-bc9c-4645eef5af50]]",
		Component: Views.Hiscore,
	},
];

export const gameStack: GameStackRoutes[] = [
	{
		id: "[[translation:ca5523c3-7fcb-487c-8e2c-64e992eafefc]]",
		Component: Views.Game,
	},
	{
		id: "article-reader",
		Component: Views.ArticleReader,
	},
	{
		id: "prize-items",
		Component: Views.PrizeItems,
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
	{
		id: "reset-password",
		Component: Views.ResetPassword,
	},
	{
		id: "reset-password-authcode",
		Component: Views.ResetPasswordAuthCode,
	},
	{
		id: "set-new-password",
		Component: Views.SetNewPassword,
	},
];

export const profileStack: ProfileStackRoutes[] = [
	{
		id: "[[translation:bbeac5e8-68b8-4c10-98f1-269857ba9347]]",
		Component: Views.UserProgress,
	},
	{
		id: "Settings",
		Component: Views.Settings,
	},
	{
		id: "Google",
		Component: Views.GoogleSearchView,
	},
	{
		id: "article-reader",
		Component: Views.ArticleReader,
	},
];
