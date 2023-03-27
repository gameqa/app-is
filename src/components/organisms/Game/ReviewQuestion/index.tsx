import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Alert, TouchableOpacity, View, Text } from "react-native";
import { Atoms } from "../../..";
import styles from "./styles";
import { Utils } from "../";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import getQuestions from "./questions";
import * as Actions from "../../../../actions";
import { CheckListItem } from "./interface";

const ReviewQuestion = () => {
	const state = useSelector((state: StoreState) => state.verifyQuestion);
	const game = useSelector((state: StoreState) => state.game);
	const dispatch = useDispatch();

	const [items, setItems] = useState<CheckListItem[]>([]);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		setItems(getQuestions());
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
			"[[translation:43ad9161-97e6-4bac-9b90-1e08e5537118]]",
			`${item?.badQuestionPrompt} [[translation:a937537e-a7d5-4852-be69-e09c00a6b43f]]`,
			[
				{
					text: "[[translation:69bad13a-c901-41c6-9bf4-21113918ab60]]",
					onPress: () => null,
				},
				{
					text: "[[translation:17b6284a-7cac-430b-9815-705e1737a072]]",
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
			<Utils.QuestionIs question={state.text} />

			{item ? (
				<View style={styles.middle}>
					<View style={styles.center}>
						<Atoms.Text.Heading>
							{item?.title}
						</Atoms.Text.Heading>
						<Atoms.Text.Para style={styles.para}>
							{item?.description}
						</Atoms.Text.Para>
						<View style={styles.buttons}>
							<Atoms.Buttons.Emoji
								emoji="[[translation:41d2a076-2114-47b8-9cbd-a21b45a280e0]]"
								onPress={() => advance(true)}
								type="success"
							/>
							<Atoms.Buttons.Emoji
								emoji="[[translation:524de2de-7c9b-4385-98ed-40c9bfc4b771]]"
								onPress={() => advance(false)}
								type="danger"
							/>
						</View>
					</View>
				</View>
			) : null}
		</View>
	);
};

export default ReviewQuestion;
