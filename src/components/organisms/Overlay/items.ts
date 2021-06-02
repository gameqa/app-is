import { OverlayItem, OverlayType } from "../../../declerations";
import Confetti from "./Confetti";
import LevelProgress from "./LevelProgress";

export interface OverlayScreen extends OverlayItem {
	Component: () => JSX.Element;
}

const items: OverlayScreen[] = [
	{
		type: OverlayType.confetti,
		handlesHide: true,
		Component: Confetti,
	},
	{
		type: OverlayType.levelProgress,
		handlesHide: true,
		Component: LevelProgress,
	},
];

export default items;
