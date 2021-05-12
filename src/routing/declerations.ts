import React from "react";

export type Tabs = "progress" | "game" | "prizes" | "invite";
export type Stacks = "log-in" | "sign-up";
export type Icons = "puzzle-piece" | "tachometer" | "user-plus" | "trophy";

export interface TabRoutes {
	Component: () => JSX.Element;
	id: Tabs;
}
export interface StackRoutes {
	Component: () => JSX.Element;
	id: Stacks;
}
