import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms } from "../../../";
import { StoreState } from "../../../../reducers";
import * as Services from "../../../../services";
import * as Actions from "../../../../actions";
import styles from "./styles";

const EndOfRound = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const prizeCategories = useSelector(
		(state: StoreState) => state.prize.prizeCategories
	);
	const dispatch = useDispatch();

	return (
		<ScrollView>
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
		</ScrollView>
	);
};

export default EndOfRound;
