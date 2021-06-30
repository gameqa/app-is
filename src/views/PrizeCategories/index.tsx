import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../layout";
import { Atoms, Molecules } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Actions from "../../actions";
import { OverlayType } from "../../declerations";
import { Linking, ScrollView, View } from "react-native";

const PrizeCategories = () => {
	const [isGiveAway, setIsGiveAway] = useState(false);

	// react-redux useDispatch hook
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(Actions.GiveAway.fetchGiveAways());
	}, [dispatch]);

	const auth = useSelector((state: StoreState) => state.auth);
	const prizeCategories = useSelector(
		(state: StoreState) => state.prize.prizeCategories
	);

	const giveAway = useSelector((state: StoreState) => state.giveAway);

	//calculate next giveaway time in seconds from array of giveaway dates
	const getNextGiveAwayTime = () => {
		const presentTime = Date.parse(new Date().toString());
		const giveAwayTime = giveAway.giveAways;
		var closest = presentTime;
		for (let i = 1; i < giveAwayTime.length; i++) {
			if (i === 1) {
				let prev =
					Date.parse(giveAwayTime[i - 1].time.toString()) -
					presentTime;
				closest = prev;
			}
			let curr =
				Date.parse(giveAwayTime[i].time.toString()) - presentTime;
			if (curr < closest) {
				closest = curr;
			}
		}
		return closest / 1000;
	};

	// fetch prize categories from API
	useEffect(() => {
		dispatch(Actions.PrizeCategory.fetchPrizeCategories());
	}, [dispatch]);

	useEffect(() => {
		dispatch(Actions.Overlay.enqueOverlay([OverlayType.newPrize]));
	}, [auth.level, prizeCategories]);

	//constant for link to Spurningar.is facebook site
	const PRIZE_GIVEAWAY_SITE = "https://www.facebook.com/spurningar.is";

	//open Spurningar.is facebook page if countdown is pressed
	const loadInBrowser = () => {
		Linking.openURL(PRIZE_GIVEAWAY_SITE).catch((err) =>
			console.error("Couldn't load page", err)
		);
	};

	const showGiveAwayAndReset = () => {
		setIsGiveAway(true);
		setTimeout(setIsGiveAway, 300000, false);
	};

	const TIME_UNTIL_GIVEAWAY = getNextGiveAwayTime();

	return (
		<ScrollView>
			<LayoutWrapper>
				<Molecules.Users.Info {...auth} />
				<Atoms.Text.Para style={styles.paragraph}>
					Hér sérðu lista yfir þá verðlaunaflokka sem eru í boði.
					Þú getur smellt á hvern flokk fyrir sig til þess að sjá
					yfirlit yfir vinninga. 🏆🎁
				</Atoms.Text.Para>
				<Molecules.GiveAway.CountDownComponent
					time={TIME_UNTIL_GIVEAWAY}
					isCounting={!isGiveAway}
					onFinish={showGiveAwayAndReset}
					onPress={loadInBrowser}
					isLoading={giveAway.isLoading}
				/>

				{prizeCategories.map((item) => (
					<Atoms.Cards.PrizeCategory {...item} />
				))}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default PrizeCategories;
