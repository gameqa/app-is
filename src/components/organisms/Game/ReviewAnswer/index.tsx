import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import { styles } from "./styles";

const ReviewAnswer = () => {
	type ReviewStage =
		| "starting-state"
		| "verify-boolean"
		| "verify-not-boolean"
		| "verify-answer"
		| "verify-answer-short"
		| "select-boolean";

	const [stage, setStage] = useState<ReviewStage>("starting-state");

	const state = useSelector((state: StoreState) => state.selectSpan);
	const game = useSelector((state: StoreState) => state.game);

	useEffect(() => {
		setStage(
			state.isYesOrNo ? "verify-boolean" : "verify-not-boolean"
		);
		return () => {
			setStage("starting-state");
		};
	}, [game.lastLoaded]);

	const dispatch = useDispatch();

	const handleVerifyDispatch = (canBeShortened: boolean) => {
		dispatch(
			Actions.Game.verifyAnswerSpan(
				game._id,
				state._id,
				canBeShortened
			)
		);
	};

	const handleVerifyYesOrNo = (answer: boolean) => {
		dispatch(
			Actions.Game.verifyYesNoQuestion(game._id, state._id, answer)
		);
	};

	const handleArchive = useCallback(async () => {
		Alert.alert(
			"[[translation:733eaeaf-7c00-4bd9-ab7d-26359b6855c9]]",
			"[[translation:ed3713df-4b8b-447a-b97b-e5b0bc29e399]]",
			[
				{
					text: "[[translation:69bad13a-c901-41c6-9bf4-21113918ab60]]",
				},
				{
					text: "[[translation:398b6757-1af6-407d-a8a2-d7c0dd667211]]",
					onPress: () =>
						dispatch(
							Actions.Game.archiveAnswer(game._id, state._id)
						),
				},
			]
		);
	}, [game._id, state._id]);

	return (
		<View style={styles.outer}>
			<ScrollView>
				<Utils.QuestionIs question={state.text} />
				<Utils.Explain>
					[[translation:51234ad0-149a-46a4-97db-428d6c36f865]] 🖊️[[translation:f0a05edd-4af1-4cb2-92ce-cc1de6bb6423]]
				</Utils.Explain>
				<Utils.SpanSelector
					immutable={true}
					{...state}
					firstWord={state.isYesOrNo ? -1 : state.firstWord}
					lastWord={state.isYesOrNo ? -1 : state.lastWord}
					onSelectFirstWord={(word) =>
						dispatch(Actions.SelectSpan.setFirstWord(word))
					}
					onSelectLastWord={(word) =>
						dispatch(Actions.SelectSpan.setLastWord(word))
					}
					onClearSelection={() =>
						dispatch(Actions.SelectSpan.clearRange())
					}
				/>
			</ScrollView>
			<View>
				{stage === "verify-answer" ? (
					<Utils.VerifyButtons
						approveEmoji="[[translation:75105759-92f1-4db4-b454-348a6942e8fb]]"
						declineEmoji="[[translation:b6d3182e-3b8b-4b3c-92b8-8264a7ddd645]]"
						onApprove={() => setStage("verify-answer-short")}
						onDecline={handleArchive}
					>
						[[translation:2181c771-6e4b-4250-880f-d27364c79f15]]
					</Utils.VerifyButtons>
				) : stage === "verify-answer-short" ? (
					<Utils.VerifyButtons
						approveEmoji="[[translation:41d2a076-2114-47b8-9cbd-a21b45a280e0]]"
						declineEmoji="[[translation:524de2de-7c9b-4385-98ed-40c9bfc4b771]]"
						onApprove={() => handleVerifyDispatch(true)}
						onDecline={() => handleVerifyDispatch(false)}
					>
						[[translation:f79ee784-1409-4baa-9bb8-d99bb85ede8c]]
					</Utils.VerifyButtons>
				) : stage === "verify-boolean" ? (
					<Utils.VerifyButtons
						approveEmoji="[[translation:41d2a076-2114-47b8-9cbd-a21b45a280e0]]"
						declineEmoji="[[translation:524de2de-7c9b-4385-98ed-40c9bfc4b771]]"
						onApprove={() => setStage("select-boolean")}
						onDecline={() =>
							dispatch(
								Actions.Game.markAsYesOrNo(
									game._id,
									state._id,
									false
								)
							)
						}
					>
						[[translation:2f05d98d-7fde-45c7-ae46-b02abec5d246]]
					</Utils.VerifyButtons>
				) : stage === "verify-not-boolean" ? (
					<Utils.VerifyButtons
						approveEmoji="[[translation:41d2a076-2114-47b8-9cbd-a21b45a280e0]]"
						declineEmoji="[[translation:524de2de-7c9b-4385-98ed-40c9bfc4b771]]"
						onApprove={() =>
							dispatch(
								Actions.Game.markAsYesOrNo(
									game._id,
									state._id,
									true
								)
							)
						}
						onDecline={() => setStage("verify-answer")}
					>
						[[translation:2f05d98d-7fde-45c7-ae46-b02abec5d246]]
					</Utils.VerifyButtons>
				) : stage === "select-boolean" ? (
					<Utils.VerifyButtons
						approveEmoji="[[translation:41d2a076-2114-47b8-9cbd-a21b45a280e0]]"
						declineEmoji="[[translation:524de2de-7c9b-4385-98ed-40c9bfc4b771]]"
						onApprove={() => handleVerifyYesOrNo(true)}
						onDecline={() => handleVerifyYesOrNo(false)}
					>
						[[translation:018ec61e-740e-47e3-8a65-77dd4d6f9ce1]]
					</Utils.VerifyButtons>
				) : null}
			</View>
		</View>
	);
};

export default ReviewAnswer;
