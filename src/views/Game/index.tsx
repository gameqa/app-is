import React, { LegacyRef, useEffect, useRef } from "react";
import LayoutWrapper from "../../layout";
import { Atoms, Molecules } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Organisms } from "../../components";
import { GameTypes, OverlayType } from "../../declerations";
import styles from "./styles";
import { ScrollView, View } from "react-native";
import { ScrollRefType } from "./types";

const Game = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const game = useSelector((state: StoreState) => state.game);
	const dispatch = useDispatch();

	// // comment out in production
	// useEffect(() => {
	// 	const desired = GameTypes.submitArticle;
	// 	if (desired !== game.current) dispatch(Actions.Game.fetchCurrentGameRound());
	// }, [game.lastLoaded]);

	// backup
	useEffect(() => {
		// refresh (backup) if no round set as current
		const INTERVAL = 1000;
		if (game.current === undefined) {
			const interval = setInterval(
				() => dispatch(Actions.Game.fetchCurrentGameRound()),
				INTERVAL
			);
			return () => {
				clearInterval(interval);
			};
		}
		// do not fetch user info if we have not progressed to next level
		if (game.current !== GameTypes.completed)
			dispatch(Actions.Auth.fetchUserFromToken());
	}, [game.current]);

	useEffect(() => {
		if (game.current === undefined) return;
		if (game.current !== GameTypes.completed) {
			dispatch(
				Actions.Overlay.enqueOverlay([OverlayType.announceGame])
			);
		} else {
			dispatch(
				Actions.Overlay.enqueOverlay([
					OverlayType.levelProgress,
					OverlayType.announceGame,
					OverlayType.newPrize,
				])
			);
		}
	}, [game.lastLoaded]);

	return (
		<View style={styles.outer}>
			<LayoutWrapper>
				<Atoms.Loaders.CenterBox />
				<Molecules.Users.Info {...auth} />
				{!game.isLoading &&
					Organisms.GameRounds.filter(
						(item) => item.type === game.current
					).map(({ Component }) => <Component />)}
			</LayoutWrapper>
			<Atoms.Loaders.CenterBox
				isLoading={game.isLoading}
				onCancel={
					game.axiosCancelTokenSource
						? () => game.axiosCancelTokenSource?.cancel()
						: undefined
				}
			/>
		</View>
	);
};

export default Game;
