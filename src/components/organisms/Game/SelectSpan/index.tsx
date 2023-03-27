import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../..";
import * as Actions from "../../../../actions";
import { StoreState } from "../../../../reducers";
import { styles } from "./style";

type stage = "verify-answer-present" | "is-boolean" | "select-span";

const SelectSpan = () => {
	// if it is true then user can locate answer span
	const [stage, setStage] = useState<stage>("verify-answer-present");

	const state = useSelector((state: StoreState) => state.selectSpan);
	const game = useSelector((state: StoreState) => state.game);
	const auth = useSelector((state: StoreState) => state.auth);
	const notiInfo = useSelector((state: StoreState) => state.notification);

	const dispatch = useDispatch();

	const archiveKey = useMemo(
		() => `GAME:SELECTSPAN:ARCHIVEWARNING:${auth._id}`,
		[auth._id]
	);

	// stores key as seen
	const markKeyAsSeen = useCallback(async () => {
		try {
			const SEEN_TOKEN = "OK";
			AsyncStorage.setItem(archiveKey, SEEN_TOKEN);
		} catch (error) {
			//
		}
	}, [archiveKey]);

	const handleCompleteStep = useCallback(async () => {
		try {
			dispatch(Actions.Game.archiveAnswer(game._id, state._id));
			await markKeyAsSeen();
		} catch (error) {
			//
		}
	}, [game._id, state._id, state.firstWord, state.lastWord]);

	const handleArchive = useCallback(async () => {
		Alert.alert(
			"[[translation:c35d4988-1f40-401b-88a8-552871a987cd]]",
			"[[translation:78f8e09e-b039-44f9-bbbe-fd134d603d6a]]",
			[
				{
					text: "[[translation:69bad13a-c901-41c6-9bf4-21113918ab60]]",
					onPress: () => markKeyAsSeen(),
				},
				{
					text: "[[translation:398b6757-1af6-407d-a8a2-d7c0dd667211]]",
					onPress: () => handleCompleteStep(),
				},
			]
		);
	}, [game._id, state._id, markKeyAsSeen, handleCompleteStep]);

	const handleMarkAsYesOrNo = () => {
		Alert.alert("[[translation:43ad9161-97e6-4bac-9b90-1e08e5537118]]", "[[translation:9ed9d5ea-217b-4e61-9928-62a1150522fc]]", [
			{
				text: "[[translation:69bad13a-c901-41c6-9bf4-21113918ab60]]",
			},
			{
				text: "[[translation:398b6757-1af6-407d-a8a2-d7c0dd667211]]",
				onPress: () =>
					dispatch(
						Actions.Game.markAsYesOrNo(
							game._id,
							state._id,
							true
						)
					),
			},
		]);
	};

	// const toogleSelectionState = () => setIsSelectingSpan((v) => !v);

	const handleSubmit = useCallback(
		() =>
			dispatch(
				Actions.Game.submitSpan(
					game._id,
					state._id,
					state.firstWord,
					state.lastWord
				)
			),
		[game._id, state._id, state.firstWord, state.lastWord]
	);

	const notification = notiInfo.notifications[0];

	return (
		<View style={styles.outer}>
			<ScrollView>
				<Utils.QuestionIs question={state.text} />
				<Atoms.Text.Para>
					[[translation:3dde1386-6f44-499b-8756-72d24d17788d]]
				</Atoms.Text.Para>
				<Utils.SpanSelector
					paragraph={state.paragraph}
					onSelectFirstWord={(i) =>
						dispatch(Actions.SelectSpan.setFirstWord(i))
					}
					onSelectLastWord={(i) =>
						dispatch(Actions.SelectSpan.setLastWord(i))
					}
					onClearSelection={() =>
						dispatch(Actions.SelectSpan.clearRange())
					}
					firstWord={state.firstWord}
					lastWord={state.lastWord}
					immutable={stage !== "select-span"}
				/>
			</ScrollView>
			<View>
				{notification ?
					<View style={styles.instructions}>
						<Atoms.Text.Heading>{notification.title}</Atoms.Text.Heading>
						<Atoms.Text.Para>{notification.text}</Atoms.Text.Para>

					</View>
				
			: null}
				{stage === "verify-answer-present" ? (
					<Utils.VerifyButtons
						approveEmoji="😃"
						declineEmoji="[[translation:b6d3182e-3b8b-4b3c-92b8-8264a7ddd645]]"
						onApprove={() => setStage("is-boolean")}
						onDecline={handleArchive}
					>
						[[translation:448a1aee-2d52-437e-bf1c-d38789cb1077]]
					</Utils.VerifyButtons>
				) : stage === "is-boolean" ? (
					<Utils.VerifyButtons
						approveEmoji="[[translation:41d2a076-2114-47b8-9cbd-a21b45a280e0]]"
						declineEmoji="[[translation:524de2de-7c9b-4385-98ed-40c9bfc4b771]]"
						onApprove={handleMarkAsYesOrNo}
						onDecline={() => setStage("select-span")}
					>
						[[translation:2f05d98d-7fde-45c7-ae46-b02abec5d246]]
					</Utils.VerifyButtons>
				) : stage === "select-span" ? (
					<React.Fragment>
						{state.firstWord !== undefined &&
						state.lastWord !== undefined ? (
							<Atoms.Buttons.Base
								label="[[translation:63d51e1b-3367-4529-9849-925856fdaff1]]"
								type="highlight"
								onPress={handleSubmit}
							/>
						) : null}
						<Atoms.Buttons.Base
							label="[[translation:78d06c58-3368-44ef-b0b6-135f6a9f4936]]"
							type="danger"
							onPress={() =>
								setStage("verify-answer-present")
							}
						/>
					</React.Fragment>
				) : null}
			</View>
		</View>
	);
};

export default SelectSpan;
