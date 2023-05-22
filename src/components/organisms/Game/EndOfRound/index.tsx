import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms } from "../../../";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import styles from "./styles";

const EndOfRound = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const prizeCategories = useSelector(
		(state: StoreState) => state.prize.prizeCategories
	);
	const dispatch = useDispatch();

	// fetch prize categories from API
	useEffect(() => {
		dispatch(Actions.PrizeCategory.fetchPrizeCategories());
	}, [dispatch]);

	return (
		<View style={styles.outerCotnainer}>
			<ScrollView style={styles.outer}>
				<Atoms.Text.Heading>[[translation:a1f4560f-51dc-4c01-bd09-041a635b7116]] [[translation:979b9bb9-66b0-42c2-8b1e-76d16a109d5b]]</Atoms.Text.Heading>
				<Atoms.Text.Para style={styles.para}>
				[[translation:3bfe0891-2017-4080-afb8-7449c2da8ad9]]. [[translation:261ecbc8-559f-4423-a0c0-22acc5a149f5]]
				</Atoms.Text.Para>
			</ScrollView>
			<Atoms.Buttons.Base
					type="highlight"
					label="[[translation:398b6757-1af6-407d-a8a2-d7c0dd667211]]"
					onPress={() =>
						dispatch(Actions.Game.fetchCurrentGameRound())
					}
				/>
		</View>
	);
};

export default EndOfRound;
