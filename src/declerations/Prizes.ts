export enum PrizeTypes {
	participationPrize,
	gangPrize,
	theChosenOnesPrize,
	influencerPrize,
}

export interface PrizeCategory {
	_id: string;
	name: string;
	prereqDescription: string;
	isAvailable: boolean;
	prizes: Prize[];
	lockedImg: string;
	unlockedImg: string;
}

export interface Prize {
	name: string;
	img: string;
	available: boolean;
}
