import React, { useEffect, useState, useCallback } from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../actions";
import * as Atoms from "../../../atoms";
import styles from "./styles";
import { StoreState } from "../../../../reducers";
const COUNT_DOWN = 4;

const PrizeAdvertisement = () => {
	const [count, setCount] = useState(COUNT_DOWN);
	const [hasLoaded, setHasLoaded] = useState(false);

	const advertisement = useSelector(
		(state: StoreState) => state.advertisement
	);

	const dispatch = useDispatch();

	const handleHide = useCallback(() => {
		if (count > 3) return;
		if (hasLoaded) dispatch(Actions.Overlay.dequeOverlay());
	}, [count]);

	useEffect(() => {
		dispatch(Actions.Advertisement.fetchRandomPrize());
	}, []);

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

	if (advertisement.prize === undefined)
		return <React.Fragment></React.Fragment>;

	return (
		<>
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
					source={{
						uri: advertisement.prize.img,
					}}
					style={styles.image}
					resizeMode="cover"
				/>
			</TouchableOpacity>
			{hasLoaded ? (
				<View style={styles.promptOuter}>
					<Atoms.Text.Para>
						Möguleiki á að vinna{" "}
						<Text style={styles.bold}>
							{advertisement.prize.name}
						</Text>
					</Atoms.Text.Para>
				</View>
			) : null}
		</>
	);
};

export default PrizeAdvertisement;
