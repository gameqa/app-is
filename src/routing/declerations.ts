import React from "react";

export type Tabs = "progress" | "game" | "prizes" | "invite";
export type PrizeStackItems = "prize-cats" | "prize-items";
export type AuthStackItems = "log-in" | "sign-up";
export type Icons = "puzzle-piece" | "tachometer" | "user-plus" | "trophy";

export interface TabRoutes {
	Component: () => JSX.Element;
	id: Tabs;
}
export interface AuthStackRoutes {
	Component: () => JSX.Element;
	id: AuthStackItems;
}
export interface PrizeStackRoutes {
	Component: () => JSX.Element;
	id: PrizeStackItems;
}
