import React, { useEffect } from "react";
import LayoutWrapper from "../../layout";
import { Atoms, Molecules } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Actions from "../../actions";
import { OverlayType } from "../../declerations";
import { Linking, ScrollView, View } from "react-native";

import CountDown from "react-native-countdown-component";

import * as Services from "../../services";

const PrizeCategories = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const prizeCategories = useSelector(
		(state: StoreState) => state.prize.prizeCategories
	);

	const giveAwayInfo = useSelector(
		(state: StoreState) => state.giveAway
	);

	useEffect(() => {
		dispatch(Actions.GiveAway.fetchGiveAways());
	}, []);

	// react-redux useDispatch hook
	const dispatch = useDispatch();

	// fetch prize categories from API
	useEffect(() => {
		dispatch(Actions.PrizeCategory.fetchPrizeCategories());
	}, [dispatch]);

	useEffect(() => {
		dispatch(Actions.Overlay.enqueOverlay([OverlayType.newPrize]));
	}, [auth.level, prizeCategories]);

	const PRIZE_GIVEAWAY = "https://www.facebook.com/spurningar.is";

	const loadInBrowser = () => {
		Linking.openURL(PRIZE_GIVEAWAY).catch((err) =>
			console.error("Couldn't load page", err)
		);
	};

	return (
		<ScrollView>
			<LayoutWrapper>
				<Molecules.Users.Info {...auth} />
				<Atoms.Text.Para style={styles.paragraph}>
					Hér sérðu lista yfir þá verðlaunaflokka sem eru í boði.
					Þú getur smellt á hvern flokk fyrir sig til þess að sjá
					yfirlit yfir vinninga. 🏆🎁
				</Atoms.Text.Para>
				<View style={{ marginVertical: 10 }}>
					<Atoms.Text.Heading
						style={{ textAlign: "center", marginBottom: 5 }}
					>
						Útdráttur á Facebook eftir
					</Atoms.Text.Heading>
					<CountDown
						until={1000}
						onFinish={() => alert("finished")}
						onPress={() => loadInBrowser()}
						size={20}
						timeLabels={{
							d: "Dagar",
							h: "Klst",
							m: "Mínútur",
							s: "Sekúndur",
						}}
						digitStyle={{
							backgroundColor:
								Services.Colors.MapToLight.highlight,
						}}
						digitTxtStyle={{
							color: Services.Colors.MapToDark.highlight,
						}}
					/>
				</View>

				{prizeCategories.map((item) => (
					<Atoms.Cards.PrizeCategory {...item} />
				))}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default PrizeCategories;
