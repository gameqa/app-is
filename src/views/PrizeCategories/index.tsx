import React from "react";
import LayoutWrapper from "../../layout";
import { Atoms, Molecules } from "../../components";
import * as Services from "../../services";
import { useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import styles from "./styles";

const PrizeCategories = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	return (
		<LayoutWrapper>
			<Molecules.Users.Info {...auth} />
			<Atoms.Text.Para style={styles.paragraph}>
				Hér sérðu lista yfir þá verðlaunaflokka sem eru í boði. Þú getur smellt á hvern
				flokk fyrir sig til þess að sjá yfirlit yfir vinninga.
			</Atoms.Text.Para>
			{Services.Prizes.PriceCategories.map((item) => (
				<Atoms.Cards.PrizeCategory {...item} />
			))}
		</LayoutWrapper>
	);
};

export default PrizeCategories;
