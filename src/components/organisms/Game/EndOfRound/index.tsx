import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms, Organisms } from "../../../";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import styles from "./styles";
import * as HOC from "../../../../hoc";

const EndOfRound = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const prizeCategories = useSelector(
		(state: StoreState) => state.prize.prizeCategories
	);
	const dispatch = useDispatch();

	return (
		<View style={styles.outer}>
			<Atoms.Text.Heading>Vel gert!</Atoms.Text.Heading>
			<Atoms.Text.Para style={styles.para}>
				Þú ert komin/n í Lvl {auth.level + 1} og ert númer{" "}
				{auth.scoreCard.hiscoreRank} á stigatöflunni. Því meira sem
				þú spilar, því fleiri stigum safnarðu og því fleiri og
				flottari vinninga áttu möguleika á að vinna.
			</Atoms.Text.Para>
			<Atoms.Text.Para style={styles.para}>
				Allar spurningarnar og svörin sem þú býrð til nýtast til
				þess að kenna gervigreind að finna svör við spurningum á
				íslensku.
			</Atoms.Text.Para>
			{prizeCategories.map((item) => (
				<Atoms.Cards.PrizeCategory {...item} />
			))}
			<Atoms.Buttons.Base
				type="highlight"
				label="Áfram"
				onPress={() =>
					dispatch(Actions.Game.fetchCurrentGameRound())
				}
			/>
		</View>
	);
};

export default EndOfRound;
