import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import styles from "./styles";
import ScreenItems, * as Screens from "./items";

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
		<View style={styles.outer} pointerEvents="box-none">
			<Screen.Component />
		</View>
	) : null;
};

export default Screen;
