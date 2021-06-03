import React, { useEffect, useRef } from "react";
import { Text, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../actions";
import { StoreState } from "../../../../reducers";
import { styles } from "./styles";
import { getGameName } from "./utils";

const AnnounceGame = () => {
	const dispatch = useDispatch();
	const game = useSelector((state: StoreState) => state.game.current);

	useEffect(() => {
		const DELAY = 3000;

		const t = setTimeout(() => {
			dispatch(Actions.Overlay.dequeOverlay());
		}, DELAY);

		return () => {
			clearTimeout(t);
		};
	}, []);

	if (!game) return <></>;

	return (
		<Animated.View style={styles.outer} pointerEvents="box-none">
			<Text style={styles.text}>{getGameName(game)}</Text>
		</Animated.View>
	);
};

export default AnnounceGame;
