import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrizeCategory as CategoryType } from "../../../../declerations";
import * as Actions from "../../../../actions";
import styles from "./styles";
import Confetti from "../Confetti";
import { Atoms } from "../../..";

const OpenBox = () => {
	// categories the user has not seen yeat
	const [newCategories, setNewCategories] = useState<CategoryType[]>([]);
	const dispatch = useDispatch();

	// declaring conts for redux state
	const prize = useSelector((state: StoreState) => state.prize);
	const auth = useSelector((state: StoreState) => state.auth);

	// check for new prizes
	useEffect(() => {
		console.log(prize.prizeCategories);
		const catNameToKey = (name: string) => `${auth._id}:${name}`;

		const hasSeen = async (name: string) => {
			return !!(await AsyncStorage.getItem(catNameToKey(name)));
		};
		const markAsSeen = async (name: string) =>
			await AsyncStorage.setItem(catNameToKey(name), "[OK]");

		const getUnseenCategories = async () => {
			const availables = prize.prizeCategories.filter(
				(category) => category.isAvailable
			);
			const results = await Promise.all(
				availables.map((cat) => hasSeen(cat.name))
			);

			return availables.filter((_, i) => !results[i]);
		};

		getUnseenCategories()
			.then((categories) => {
				setNewCategories(categories);
				return categories;
			})
			.then(async (categories) => {
				await Promise.all(
					categories.map((cat) => markAsSeen(cat.name))
				);
				if (categories.length === 0)
					dispatch(Actions.Overlay.dequeOverlay());
			})
			.catch((error) => {
				// do nothing on errror
			});
	}, [auth.level, prize.prizeCategories, auth._id]);

	const category = newCategories[0];

	if (!category) return <React.Fragment />;
	return (
		<View style={styles.outer}>
			<View style={styles.inner}>
				<View style={styles.chestContainer}>
					<Image
						source={{
							uri: "https://dunb17ur4ymx4.cloudfront.net/wysiwyg/550688/7d2d3a13aa181518d8ac81fd78b0febeafa8c7e1.png",
						}}
						style={styles.image}
						resizeMode="contain"
					/>
				</View>
				<Atoms.Text.Heading>
					Nýr flokkur aflæstur!
				</Atoms.Text.Heading>
				<Atoms.Text.Para>
					{category.name} er vinningaflokkur sem inniheldur{" "}
					{category.prizes.length} mismunandi vinninga. Með því
					að spila leikinn og/eða bjóða vinum að spila aflæsir þú
					fleiri flokka!
				</Atoms.Text.Para>
				<Atoms.Buttons.Base
					label="Áfram"
					type="success"
					onPress={() =>
						dispatch(Actions.Overlay.dequeOverlay())
					}
				/>
			</View>
			<Confetti persist />
		</View>
	);
};

export default OpenBox;
