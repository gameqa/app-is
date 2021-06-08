import React, { useEffect } from "react";
import LayoutWrapper from "../../layout";
import { Atoms, Molecules } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Actions from "../../actions";
import { OverlayType } from "../../declerations";
import { ScrollView } from "react-native";

const PrizeCategories = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const prizeCategories = useSelector(
		(state: StoreState) => state.prize.prizeCategories
	);

	// react-redux useDispatch hook
	const dispatch = useDispatch();

	// fetch prize categories from API
	useEffect(() => {
		dispatch(Actions.PrizeCategory.fetchPrizeCategories());
	}, [dispatch]);

	useEffect(() => {
		dispatch(Actions.Overlay.enqueOverlay([OverlayType.newPrize]));
	}, [auth.level, prizeCategories]);

	return (
		<ScrollView>
			<LayoutWrapper>
				<Molecules.Users.Info {...auth} />
				<Atoms.Text.Para style={styles.paragraph}>
					Hér sérðu lista yfir þá verðlaunaflokka sem eru í boði.
					Þú getur smellt á hvern flokk fyrir sig til þess að sjá
					yfirlit yfir vinninga. 🏆🎁
				</Atoms.Text.Para>
				{prizeCategories.map((item) => (
					<Atoms.Cards.PrizeCategory {...item} />
				))}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default PrizeCategories;
