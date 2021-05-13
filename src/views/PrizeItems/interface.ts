import { Prizes } from "../../services";

export interface IProps {
	route: {
		params: Prizes.PrizeCategory;
	};
	navigation: {
		goBack: () => void;
	};
}
