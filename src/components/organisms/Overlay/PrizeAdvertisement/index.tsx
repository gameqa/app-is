import React, { useEffect, useState, useCallback } from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../actions";
import * as Atoms from "../../../atoms";
import styles from "./styles";
import { Advertisement } from "./../../../../static/";
import { StoreState } from "../../../../reducers";
const COUNT_DOWN = 4;

const PrizeAdvertisement = () => {
	const [count, setCount] = useState(COUNT_DOWN);
	const [hasLoaded, setHasLoaded] = useState(false);

	const state = useSelector((state: StoreState) => state.writeQuestion);
	const dispatch = useDispatch();

	const handleHide = useCallback(() => {
		if (hasLoaded) dispatch(Actions.Overlay.dequeOverlay());
	}, [count]);

	useEffect(() => {
		if (!hasLoaded) return;

		const MS_IN_S = 1000;

		if (count === 0) handleHide();
		else {
			const interval = setInterval(() => {
				setCount((c) => c - 1);
			}, MS_IN_S);
			return () => {
				clearInterval(interval);
			};
		}
	}, [count, handleHide, hasLoaded]);

	return (
		<View style={styles.outer}>
			{hasLoaded ? (
				<View style={styles.counterOuter}>
					<Atoms.Text.Para>{count}</Atoms.Text.Para>
				</View>
			) : null}
			<TouchableOpacity onPress={handleHide}>
				{count < 3 ? (
					<Atoms.Text.Para style={styles.promptClose}>
						Ýttu á skjá til að loka
					</Atoms.Text.Para>
				) : null}
				<Image
					onLoad={() => setHasLoaded(true)}
					source={Advertisement.noccoAdvertisement}
					style={styles.image}
					resizeMode="cover"
				/>
			</TouchableOpacity>
			{hasLoaded ? (
				<View style={styles.promptOuter}>
					<Atoms.Text.Para>
						Möguleiki á að vinna{" "}
						<Text style={styles.bold}>
							"Vöru"
							{/* {state.advertisement.subject_tf} */}
						</Text>
					</Atoms.Text.Para>
				</View>
			) : null}
		</View>
	);
};

export default PrizeAdvertisement;
