import React, { useEffect, useState, useCallback } from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Atoms } from "../../..";
import * as Actions from "../../../../actions";
import styles from "./styles";

const COUNT_DOWN_FROM = 7;

const AskAboutImage = () => {
	const [count, setCount] = useState(COUNT_DOWN_FROM);
	const [hasLoaded, setHasLoaded] = useState(false);

	const dispatch = useDispatch();

	const handleHide = useCallback(() => {
		if (hasLoaded) dispatch(Actions.Overlay.dequeOverlay());
	}, [count]);

	useEffect(() => {
		if (!hasLoaded) return;

		const MS_IN_S = 1000;
		console.log(`count`, count);
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
				<Image
					onLoad={() => setHasLoaded(true)}
					source={{
						uri: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F04%2F20%2Fqueen-elizabeth-ii-2000.jpg",
					}}
					style={styles.image}
					resizeMode="cover"
				/>
			</TouchableOpacity>
			{hasLoaded ? (
				<View style={styles.promptOuter}>
					<Atoms.Text.Para>
						Spurðu spurningu um{" "}
						<Text style={styles.bold}>
							Elísabetu Englandsdrottningu
						</Text>
					</Atoms.Text.Para>
				</View>
			) : null}
		</View>
	);
};

export default AskAboutImage;
