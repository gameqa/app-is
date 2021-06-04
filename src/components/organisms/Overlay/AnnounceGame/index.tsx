import React, { useEffect, useRef } from "react";
import { Animated, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../actions";
import { StoreState } from "../../../../reducers";
import { styles } from "./styles";

const AnnounceGame = () => {
	const dispatch = useDispatch();

	const opacityValue = useRef(new Animated.Value(0)).current;
	// const game = useSelector((state: StoreState) => state.game.current);

	useEffect(() => {
		const DISSAPEAR_DELAY = 2750;
		const ANIM_DURATION = 350;
		const OPACITY_TARGET = 1;
		const BUFFER = 100;

		Animated.timing(opacityValue, {
			toValue: OPACITY_TARGET,
			duration: ANIM_DURATION,
			useNativeDriver: false,
		}).start();

		const t1 = setTimeout(() => {
			Animated.timing(opacityValue, {
				toValue: 0,
				duration: ANIM_DURATION,
				useNativeDriver: false,
			}).start();
		}, DISSAPEAR_DELAY - ANIM_DURATION - BUFFER);

		const t2 = setTimeout(() => {
			dispatch(Actions.Overlay.dequeOverlay());
		}, DISSAPEAR_DELAY);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, []);

	return (
		<Animated.View
			style={{ ...styles.outer, opacity: opacityValue }}
			pointerEvents="box-none"
		>
			<Image
				source={{
					uri: "https://i.imgur.com/CZVDHd9.png",
				}}
				style={styles.image}
				resizeMode="contain"
			/>
		</Animated.View>
	);
};

export default AnnounceGame;
