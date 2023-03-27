import React from "react";

export type Tabs =
	| "[[translation:bbeac5e8-68b8-4c10-98f1-269857ba9347]]"
	| "[[translation:ca5523c3-7fcb-487c-8e2c-64e992eafefc]]"
	| "[[translation:749736db-66a3-42dc-ba0f-0ccd44135d4d]]"
	| "[[translation:ffa22022-0151-47c4-bc9c-4645eef5af50]]"
	| "[[translation:27d82309-5af5-4387-8151-15bdbadf719b]]";

export type PrizeStackItems = "prize-cats" | "prize-items";
export type AuthStackItems =
	| "log-in"
	| "sign-up"
	| "reset-password"
	| "reset-password-authcode"
	| "set-new-password";

export type GameStackItems = "[[translation:ca5523c3-7fcb-487c-8e2c-64e992eafefc]]" | "article-reader" | "prize-items";
export type ProfileStackItems = "[[translation:bbeac5e8-68b8-4c10-98f1-269857ba9347]]" | "Google" | "article-reader"

export type Icons =
	| "puzzle-piece"
	| "tachometer"
	| "sort-amount-asc"
	| "trophy"
	| "users";

type Component = (() => JSX.Element) | ((v: any) => JSX.Element);


export interface TabRoutes {
	Component: Component;
	id: Tabs;
}
export interface AuthStackRoutes {
	Component: Component;
	id: AuthStackItems;
}
export interface GameStackRoutes {
	Component: Component;
	id: GameStackItems;
}
export interface PrizeStackRoutes {
	Component: Component;
	id: PrizeStackItems;
}
export interface ProfileStackRoutes {
	Component: Component;
	id: ProfileStackItems;
}

