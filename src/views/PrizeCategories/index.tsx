import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../layout";
import { Atoms, Molecules } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import styles from "./styles";
import { PrizeCategory as CategoryType } from "../../declerations";
import { PrizeCategory } from "../../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrizeCategories = () => {
	// categories the user has not seen yeat
	const [newCategories, setNewCategories] = useState<CategoryType[]>([]);

	// declaring conts for redux state
	const auth = useSelector((state: StoreState) => state.auth);
	const prize = useSelector((state: StoreState) => state.prize);
	const prizeCategories = useSelector(
		(state: StoreState) => state.prize.prizeCategories
	);

	// react-redux useDispatch hook
	const dispatch = useDispatch();

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
				await Promise.all(
					categories.map(async (cat) => markAsSeen(cat.name))
				);
			})
			.catch((error) => {
				// do nothing on errror
			});
	}, [auth.level, prize.prizeCategories, auth._id]);

	// fetch prize categories from API
	useEffect(() => {
		dispatch(PrizeCategory.fetchPrizeCategories());
	}, [dispatch]);

	return (
		<LayoutWrapper>
			<Molecules.Users.Info {...auth} />
			<Atoms.Text.Para style={styles.paragraph}>
				Hér sérðu lista yfir þá verðlaunaflokka sem eru í boði. Þú
				getur smellt á hvern flokk fyrir sig til þess að sjá
				yfirlit yfir vinninga.
			</Atoms.Text.Para>
			{prizeCategories.map((item) => (
				<Atoms.Cards.PrizeCategory {...item} />
			))}
		</LayoutWrapper>
	);
};

export default PrizeCategories;
