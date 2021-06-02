import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState, useEffect } from "react";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import styles from "./styles";
import ScreenItems, * as Screens from "./items";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Screen = () => {
	const state = useSelector((state: StoreState) => state.overlay);
	const [Screen, setScreen] =
		useState<Screens.OverlayScreen | undefined>();

	useEffect(() => {
		const nextOverlay = state.queue[0];
		setScreen(
			ScreenItems.find((screen) => screen.type === nextOverlay)
		);
	}, [state.queue.length]);

	return Screen ? (
		<AnimatedBlurView
			tint="default"
			intensity={0}
			style={styles.outer}
		>
			<Screen.Component />
		</AnimatedBlurView>
	) : null;
};

export default Screen;
