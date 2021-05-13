import React, { useEffect } from "react";
import { View, Text } from "react-native";
import LayoutWrapper from "../../layout";
import { Molecules, Atoms } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Organisms } from "../../components";
import { GameTypes } from "../../declerations";

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
		const desired = GameTypes.writeQuestion;
		if (desired !== game.current) dispatch(Actions.Game.fetchCurrentGameRound());
	}, [game.current]);
	return (
		<LayoutWrapper>
			<Molecules.Users.Info {...auth} />
			{Organisms.GameRounds.filter((item) => item.type === game.current).map(
				({ Component }) => (
					<Component />
				)
			)}
		</LayoutWrapper>
	);
};

export default Game;
