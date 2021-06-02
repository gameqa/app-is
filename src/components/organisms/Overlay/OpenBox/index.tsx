import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrizeCategory as CategoryType } from "../../../../declerations";
import styles from "./styles";
import Confetti from "../Confetti";

const OpenBox = () => {
	// categories the user has not seen yeat
	const [newCategories, setNewCategories] = useState<CategoryType[]>([]);

	// declaring conts for redux state
	const prize = useSelector((state: StoreState) => state.prize);
	const auth = useSelector((state: StoreState) => state.auth);

	// check for new prizes
	useEffect(() => {
		const catNameToKey = (name: string) => `${auth._id}:${name}`;

		const hasSeen = async (name: string) =>
			!!(await AsyncStorage.getItem(catNameToKey(name)));

		const markAsSeen = async (name: string) =>
			await AsyncStorage.setItem(catNameToKey(name), "[OK]");

		const getUnseenCategories = async () =>
			Promise.all(
				prize.prizeCategories
					.filter((category) => category.isAvailable)
					.filter((category) => !hasSeen(category.name))
			);

		getUnseenCategories()
			.then((categories) => {
				setNewCategories(categories);
				return categories;
			})
			.then(async (categories) => {
				// await Promise.all(
				// 	categories.map(async (cat) => markAsSeen(cat.name))
				// );
			})
			.catch((error) => {
				// do nothing on errror
			});
	}, [auth.level, prize.prizeCategories, auth._id]);
	// if (newCategories.length === 0) return <React.Fragment />;
	return (
		<View style={styles.outer}>
			<View style={styles.inner}>
				<View style={styles.chestContainer}>
					<Image
						source={{
							uri: "https://lh3.googleusercontent.com/proxy/GvuKlGCk0DsM-U_IIXE4pDzEn1xbHK3ijvpZZIZK3IXyKsZfrCRKEjZO1KcS90-XsXYm10XGdbkygLfernFlZl96Kizsvoe0p0ElLRZjv8PuQSggOWlfPF1EmFrJ9sAfvApVQH4kp3w",
						}}
						style={{
							height: "80%",
							width: "80%",
						}}
						resizeMode="contain"
					/>
				</View>
			</View>
			<Confetti />
		</View>
	);
};

export default OpenBox;
