import { BlurView } from "expo-blur";
import React from "react";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import styles from "./styles";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Screen = () => {
	const state = useSelector((state: StoreState) => state.overlay);

	// gets firstItem
	const current = state.queue[0];

	return current ? (
		<AnimatedBlurView
			tint="default"
			intensity={100}
			style={styles.outer}
		/>
	) : null;
};

export default Screen;
