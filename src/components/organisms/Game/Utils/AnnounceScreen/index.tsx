import React, { useState } from "react";
import { Animated, Text } from "react-native";
import { BlurView } from "expo-blur";
import styles from "./styles";
import { useSelector } from "react-redux";
import { StoreState } from "../../../../../reducers";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const AnnounceScreen = () => {
	const outerIntensity = React.useRef(new Animated.Value(0)).current;
	const innerOpacity = React.useRef(new Animated.Value(0)).current;
	const game = useSelector((state: StoreState) => state.game);
	const auth = useSelector((state: StoreState) => state.auth);

	const [shouldHide, setShouldHide] = useState(true);

	const [target, setTarget] = useState(0);
	const [current, setCurrent] = useState(0);

	const animateFadeIn = () => {
		Animated.timing(outerIntensity, {
			toValue: 100,
			duration: 500,
			useNativeDriver: false,
		}).start();
		Animated.timing(innerOpacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false,
		}).start();
	};

	const animateFadeOut = () => {
		Animated.timing(outerIntensity, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: false,
		}).start();
		Animated.timing(innerOpacity, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	};

	React.useEffect(() => {
		if (!shouldHide) {
			animateFadeIn();
			setTarget((game.currentRound - 1) / game.totalRounds);
			setCurrent(Math.max(0, game.currentRound - 2) / game.totalRounds);
		}
	}, [shouldHide]);

	React.useEffect(() => {
		if (game.lastLoaded > 0 && game.currentRound > 1) setShouldHide(false);
	}, [game.lastLoaded]);

	React.useEffect(() => {
		const TIMEOUT = 75;
		if (current !== target) {
			const t = setTimeout(
				() => setCurrent((cur) => Math.max(0, Math.min(cur + 0.015, target))),
				TIMEOUT
			);
			return () => {
				clearTimeout(t);
			};
		} else {
			const t1 = setTimeout(animateFadeOut, 1000);
			const t2 = setTimeout(() => setShouldHide(true), 2100);
			return () => {
				clearTimeout(t1);
				clearTimeout(t2);
			};
		}
	}, [target, current]);

	if (shouldHide) return null;
	return (
		<AnimatedBlurView tint="default" intensity={outerIntensity} style={styles.outer}>
			<Animated.View style={{ ...styles.middle, opacity: innerOpacity }}>
				<Text style={styles.percentage}>{Math.round(current * 100)}%</Text>
				<Text style={styles.toLevel}>- að lvl {auth.level + 1} -</Text>
			</Animated.View>
		</AnimatedBlurView>
	);
};

export default AnnounceScreen;
