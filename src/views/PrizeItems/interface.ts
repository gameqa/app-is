import { Prize } from "../../declerations";

export interface IProps {
	route: {
		params: Prize[];
	};
	navigation: {
		goBack: () => void;
	};
}
