import React, { useState, useCallback } from "react";
import { Alert, View } from "react-native";
import { Atoms } from "../../..";
import styles from "./styles";
import { Utils } from "../";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import getQuestions from "./questions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Actions from "../../../../actions";

const ReviewQuestion = () => {
	const state = useSelector((state: StoreState) => state.verifyQuestion);
	const game = useSelector((state: StoreState) => state.game);
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const [items, setItems] = useState(getQuestions(state.isYesOrNo));

	// toggle true false for item at index i
	const markItem = (i: number) => {
		const copy = [...items];
		copy[i].value = !copy[i].value;
		setItems([...copy]);
	};

	// returns true if all items are checked
	const allItemsAreGood = () => items.every((item) => item.value);

	const markKeyAsSeen = async (key: string) => {
		try {
			const SEEN_TOKEN = "OK";
			AsyncStorage.setItem(key, SEEN_TOKEN);
		} catch (error) {
			//
		}
	};

	const checkIfHasSeenKey = async (key: string): Promise<boolean> => {
		try {
			const value = await AsyncStorage.getItem(key);
			return value !== null;
		} catch (error) {
			return false;
		}
	};

	const handleAlert = async () => {
		try {
			const message = allItemsAreGood()
				? "Þú hakaðir í alla reiti, það þýðir að þú telur spurninguna vera góða"
				: "Þú slepptir sumum reitum, það þýðir að spurningin er slæm og við munum eyða henni.";
			const key = getStorageKey();
			const hasSeen = await checkIfHasSeenKey(key);
			if (hasSeen) handleCompleteStep(key);
			else
				Alert.alert("Ertu viss", message, [
					{
						text: "Hætta við",
						onPress: () => markKeyAsSeen(key),
						style: "cancel",
					},
					{
						text: "Já",
						onPress: () => handleCompleteStep(key),
					},
				]);
		} catch (error) {
			//
		}
	};

	const handleCompleteStep = async (key: string) => {
		try {
			await markKeyAsSeen(key);
			dispatch(
				Actions.Game.submitVerifyQuestion(game._id, state._id, allItemsAreGood())
			);
		} catch (error) {
			//
		}
	};

	const getStorageKey = useCallback(() => {
		// check if all are marked
		return allItemsAreGood()
			? `${auth}:verify-good-question-alert-seen`
			: `${auth}:verify-bad-question-alert-seen`;
	}, [items]);

	return (
		<View>
			<Utils.QuestionIs question={state.text} />
			<Atoms.Text.Para style={styles.para}>
				Áður en við höldum af stað og finnum svarið við þessari spurningu, þá viljum við
				vera viss um að þetta sé góð spurning. Farðu yfir tékklistann hér fyrir neðan og
				hakaðu við þau atriði sem þú ert sammála
			</Atoms.Text.Para>
			{items.map((item, i) => (
				<Atoms.Cards.CheckListItem {...item} onPress={() => markItem(i)} />
			))}
			<Atoms.Buttons.Base onPress={handleAlert} label="Staðfesta" type="highlight" />
		</View>
	);
};

export default ReviewQuestion;
