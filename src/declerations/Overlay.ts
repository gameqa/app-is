export enum OverlayType {
	newPrize,
	confetti,
	levelProgress,
	announceGame,
	askAboutImage,
}

export interface OverlayItem {
	type: OverlayType;
	handlesHide?: boolean;
}
