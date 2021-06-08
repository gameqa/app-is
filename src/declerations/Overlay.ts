export enum OverlayType {
	newPrize,
	confetti,
	levelProgress,
	announceGame,
	askAboutImage,
	advertisePrize,
}

export interface OverlayItem {
	type: OverlayType;
	handlesHide?: boolean;
}
