import React from "react";

export type Tabs = "progress" | "game" | "prizes" | "invite";
export type Icons = "puzzle-piece" | "tachometer" | "user-plus" | "trophy";

export interface Route {
	Component: () => JSX.Element;
	id: Tabs;
}
