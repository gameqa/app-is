export enum OverlayType {
	newPrize,
	confetti,
	levelProgress,
}

export interface OverlayItem {
	type: OverlayItem;
	handlesHide?: boolean;
}
