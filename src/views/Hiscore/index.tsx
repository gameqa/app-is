import React, { useEffect } from "react";
import { ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Atoms, Molecules } from "../../components";
import { useFocusEffect } from "@react-navigation/core";

const Highscore = () => {
	const highscore = useSelector((state: StoreState) => state.highscore);
	const dispatch = useDispatch();

	useFocusEffect(
		React.useCallback(() => {
			dispatch(Actions.Highscore.fetchHighscorePlacement());
		}, [])
	);

	return (
		<ScrollView style={{backgroundColor: "white"}}>
			<SafeAreaView>
			{highscore.isLoading ? (
				<ActivityIndicator />
			) : (
				highscore.highscores
					.sort(
						(a, b) =>
							a.scoreCard.hiscoreRank -
							b.scoreCard.hiscoreRank
					)
					.map((user) => (
						<Atoms.Cards.HighscoreItem user={user} />
					))
			)}

			</SafeAreaView>
		</ScrollView>
	);
};

export default Highscore;
