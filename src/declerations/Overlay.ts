export enum OverlayType {
	newPrize,
	confetti,
	levelProgress,
	announceGame,
}

export interface OverlayItem {
	type: OverlayType;
	handlesHide?: boolean;
}
