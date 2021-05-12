import { Route } from "./declerations";
import * as Views from "../views";

const routeList: Route[] = [
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
		Component: Views.UserProgress,
	},
	{
		id: "prizes",
		Component: Views.UserProgress,
	},
];

export default routeList;
