import React, { useState, useCallback, useEffect } from "react";
import { Alert, View } from "react-native";
import { Atoms } from "../../..";
import styles from "./styles";
import { Utils } from "../";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import getQuestions from "./questions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Actions from "../../../../actions";
import { CheckListItem } from "./interface";

const ReviewQuestion = () => {
	const state = useSelector((state: StoreState) => state.verifyQuestion);
	const game = useSelector((state: StoreState) => state.game);
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const [items, setItems] = useState<CheckListItem[]>([]);

	useEffect(() => {
		setItems(getQuestions(state.isYesOrNo));
	}, [game.lastLoaded]);

	// toggle true false for item at index i
	const markItem = (i: number) => {
		const copy = [...items];
		copy[i].value = !copy[i].value;
		setItems([...copy]);
	};

	// returns true if all items are checked
	const allItemsAreGood = () => items.every((item) => item.value);

	// stores key as seen
	const markKeyAsSeen = async (key: string) => {
		try {
			const SEEN_TOKEN = "OK";
			AsyncStorage.setItem(key, SEEN_TOKEN);
		} catch (error) {
			//
		}
	};

	// returns ture if key has been acknowledged by user before
	const checkIfHasSeenKey = async (key: string): Promise<boolean> => {
		try {
			const value = await AsyncStorage.getItem(key);
			return value !== null;
		} catch (error) {
			return false;
		}
	};

	// alerts the student for the first time he marks as good or bad
	const handleAlert = async () => {
		try {
			const message = allItemsAreGood()
				? "Þú hakaðir í alla reiti sem þýðir að þú telur spurninguna vera góða."
				: "Þú slepptir sumum reitum sem þýðir að spurningin er slæm og við munum eyða henni.";
			const key = getStorageKey();
			const hasSeen = await checkIfHasSeenKey(key);
			if (hasSeen && allItemsAreGood()) handleCompleteStep(key);
			else
				Alert.alert("Ertu viss?", message, [
					{
						text: "Hætta við",
						onPress: () => markKeyAsSeen(key),
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

	// handles completing step and dispatching action
	// which will get next rounds info
	const handleCompleteStep = async (key: string) => {
		try {
			await markKeyAsSeen(key);
			dispatch(
				Actions.Game.submitVerifyQuestion(
					game._id,
					state._id,
					allItemsAreGood()
				)
			);
		} catch (error) {
			//
		}
	};

	// gets the storage key based on users id and
	// if he is marking the question as good or bad
	const getStorageKey = useCallback(() => {
		// check if all are marked
		return allItemsAreGood()
			? `${auth._id}:verify-good-question-alert-seen`
			: `${auth}:verify-bad-question-alert-seen`;
	}, [items]);

	return (
		<View>
			<Utils.QuestionIs question={state.text} />
			<Utils.Explain>
				Áður en við reynum að finna svarið við þessari spurningu,
				þá viljum við vera viss um að þetta sé góð spurning. Farðu
				yfir tékklistann hér fyrir neðan og hakaðu við þau atriði
				sem þú ert sammála.
			</Utils.Explain>
			{items.map((item, i) => (
				<Atoms.Cards.CheckListItem
					{...item}
					onPress={() => markItem(i)}
				/>
			))}
			<Atoms.Buttons.Base
				onPress={handleAlert}
				label="Staðfesta"
				type="highlight"
			/>
		</View>
	);
};

export default ReviewQuestion;
