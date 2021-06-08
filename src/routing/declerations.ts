import React from "react";

export type Tabs = "Ég" | "Spila" | "Vinningar" | "Bjóða";
export type PrizeStackItems = "prize-cats" | "prize-items";
export type AuthStackItems = "log-in" | "sign-up" ;
export type GameStackItems = "Spila" | "article-reader" | "prize-items";
export type Icons = "puzzle-piece" | "tachometer" | "user-plus" | "trophy";

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
