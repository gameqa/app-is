import React, { useEffect } from "react";
import LayoutWrapper from "../../layout";
import { Molecules } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Organisms } from "../../components";
import { GameTypes } from "../../declerations";
import styles from "./styles";
import { ActivityIndicator, ScrollView, View } from "react-native";

const Game = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const game = useSelector((state: StoreState) => state.game);
	const dispatch = useDispatch();

	// comment out in dev
	// useEffect(() => {
	// 	dispatch(Actions.Game.fetchCurrentGameRound());
	// }, []);

	// comment out in production
	useEffect(() => {
		const desired = GameTypes.questionQualityAssurance;
		if (desired !== game.current) dispatch(Actions.Game.fetchCurrentGameRound());
	}, [game.lastLoaded]);

	return (
		<View style={styles.outer}>
			<ScrollView>
				<LayoutWrapper>
					<Molecules.Users.Info {...auth} />
					{Organisms.GameRounds.filter((item) => item.type === game.current).map(
						({ Component }) => (
							<Component />
						)
					)}
				</LayoutWrapper>
			</ScrollView>
			{game.isLoading ? (
				<View style={styles.loading}>
					<ActivityIndicator />
				</View>
			) : null}
		</View>
	);
};

export default Game;
