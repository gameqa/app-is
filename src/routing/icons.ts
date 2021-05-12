import { Tabs, Icons } from "./declerations";

export const mapTabToIcon: { [k in Tabs]: Icons } = {
	game: "puzzle-piece",
	invite: "user-plus",
	prizes: "trophy",
	progress: "tachometer",
};
