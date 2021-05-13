import React from "react";
import LayoutWrapper from "../../layout";
import { Atoms, Molecules } from "../../components";
import * as Services from "../../services";
import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";

const PrizeCategories = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	return (
		<LayoutWrapper>
			<Molecules.Users.Info {...auth} />
			{Services.Prizes.PriceCategories.map((item) => (
				<Atoms.Cards.PrizeCategory {...item} />
			))}
		</LayoutWrapper>
	);
};

export default PrizeCategories;
