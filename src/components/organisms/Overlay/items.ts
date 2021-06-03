import { OverlayItem, OverlayType } from "../../../declerations";
import Confetti from "./Confetti";
import LevelProgress from "./LevelProgress";
import OpenBox from "./OpenBox";
import AnnounceGame from "./AnnounceGame";

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
	{
		type: OverlayType.newPrize,
		handlesHide: false,
		Component: OpenBox,
	},
	{
		type: OverlayType.announceGame,
		Component: AnnounceGame,
	},
];

export default items;
