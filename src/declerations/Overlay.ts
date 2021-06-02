export enum OverlayType {
	newPrize,
	confetti,
	levelProgress,
}

export interface OverlayItem {
	type: OverlayType;
	handlesHide?: boolean;
}
