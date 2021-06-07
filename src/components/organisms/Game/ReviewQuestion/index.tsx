import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
	Alert,
	ScrollView,
	TouchableOpacity,
	View,
	Text,
} from "react-native";
import { Atoms } from "../../..";
import styles from "./styles";
import { Utils } from "../";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import getQuestions from "./questions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Actions from "../../../../actions";
import { CheckListItem } from "./interface";
import style from "../../Notifications/styles";

const ReviewQuestion = () => {
	const state = useSelector((state: StoreState) => state.verifyQuestion);
	const game = useSelector((state: StoreState) => state.game);
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const [items, setItems] = useState<CheckListItem[]>([]);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		setItems(getQuestions(state.isYesOrNo));
		setCurrent(0);
	}, [game.lastLoaded]);

	const item = useMemo<CheckListItem | undefined>(
		() => items[current],
		[items, current]
	);

	// toggle true false for item at index i
	const advance = useCallback(
		(isGood: boolean) => {
			if (isGood) {
				const copy = [...items];
				copy[current].value = isGood;
				setItems([...copy]);
				setCurrent((c) => c + 1);
			} else handleArchive();
		},
		[items, current]
	);

	useEffect(() => {
		if (items.length > 0 && items.length === current)
			handleCompleteStep(true);
	}, [current, items]);

	// handles archive
	const handleArchive = async () =>
		Alert.alert(
			"Ertu viss?",
			`${item?.badQuestionPrompt} Ef svo er þá munum við eyða henni.`,
			[
				{
					text: "Hætta við",
					onPress: () => null,
				},
				{
					text: "Já",
					onPress: () => handleCompleteStep(false),
				},
			]
		);

	// handles completing step and dispatching action
	// which will get next rounds info
	const handleCompleteStep = async (isGood: boolean) =>
		dispatch(
			Actions.Game.submitVerifyQuestion(game._id, state._id, isGood)
		);

	return (
		<View style={styles.flex}>
			{/* <Atoms.Text.Para style={styles.para}>
				Áður en við reynum að finna svarið við þessari spurningu,
				þá viljum við vera viss um að þetta sé góð spurning. Farðu
				yfir tékklistann hér fyrir neðan og hakaðu við þau atriði
				sem þú ert sammála.
			</Atoms.Text.Para> */}
			{/* {items.map((item, i) => (
				<Atoms.Cards.CheckListItem
					{...item}
					onPress={() => markItem(i)}
				/>
			))} */}
			{item ? (
				<View style={styles.center}>
					<Utils.QuestionIs question={state.text} />
					<Atoms.Text.Para style={styles.para}>
						{item.description}
					</Atoms.Text.Para>

					<View style={styles.buttons}>
						<TouchableOpacity
							style={[
								styles.emojiButton,
								styles.emojiButtonThumpsUp,
							]}
							onPress={() => advance(true)}
						>
							<Text
								style={[
									styles.emojiText,
									styles.emojiTextThumpsUp,
								]}
							>
								👍
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.emojiButton,
								styles.emojiButtonThumpsDown,
							]}
							onPress={() => advance(false)}
						>
							<Text
								style={[
									styles.emojiText,
									styles.emojiTextThumpsDown,
								]}
							>
								👎
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
			{/* 
			<Atoms.Buttons.Base
				onPress={handleAlert}
				label="Staðfesta"
				type="highlight"
			/> */}
		</View>
	);
};

export default ReviewQuestion;
