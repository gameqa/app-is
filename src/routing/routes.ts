import {
	AuthStackRoutes,
	PrizeStackRoutes,
	TabRoutes,
	GameStackRoutes,
} from "./declerations";
import * as Views from "../views";

export const tab: TabRoutes[] = [
	{
		id: "Ég",
		Component: Views.UserProgress,
	},
	{
		id: "Deila",
		Component: Views.Invite,
	},
	{
		id: "Stigatafla",
		Component: Views.Hiscore,
	},
];

export const gameStack: GameStackRoutes[] = [
	{
		id: "Spila",
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
