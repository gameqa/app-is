import React, { useState } from "react";
import {
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import styles from "./styles";
import * as Actions from "../../../../actions";
import { submitQuestion } from "../../../../actions/game";
import { Alert, OverlayType } from "../../../../declerations";
import { Utils } from "../";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const WriteQuestion = () => {
	const state = useSelector((state: StoreState) => state.writeQuestion);
	const { _id: gameRoundId } = useSelector(
		(state: StoreState) => state.game
	);

	const [error, setError] = useState<Alert>();
	const dispatch = useDispatch();

	const handleUserInput = (text: string) =>
		dispatch(Actions.WriteQuestion.writeQuestion(text));

	const YES_NO_INDICATOR = "Já/Nei";
	const isYesNoQuestion = state.questionType === YES_NO_INDICATOR;

	const handleSubmit = () => {
		const question = state.question.trim();
		const MIN_QUESTION_LENGTH = 13;
		try {
			if (question.length < MIN_QUESTION_LENGTH)
				throw new Error(`[[translation:d9e95a1f-d9e9-4f89-8c98-baca4805b55e]]`);
			if (question.slice(-1) !== "?")
				throw new Error(
					`[[translation:fd1f418f-135f-4b13-b28b-eb6a543cc579]]`
				);
			setError(undefined);
			dispatch(
				submitQuestion(gameRoundId, question, isYesNoQuestion)
			);
		} catch (e) {
			const ALERT_TYPE = "danger";
			setError({ label: e.message, type: ALERT_TYPE });
		}
	};

	return (
		<ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS !== "ios" ? "height" : "padding"}
			>
				<Atoms.Alerts.Ribbon item={error} />
				<Utils.Explain>
					[[translation:239e14d4-ee59-4ec9-8977-7c3daba674fa]]. [[translation:5d837438-3c49-4ff1-8a55-68874a826574]]🔎[[translation:019caaf7-b2f7-4d8a-a1d7-966e74e4301a]]
				</Utils.Explain>
				<View style={styles.marginTop}>
					<View style={styles.imagePreview}>
						<View style={styles.previewBanner}>
							<Atoms.Text.Para>
								[[translation:80a89a34-0646-44a9-a169-5daf07edc421]] {state.image.subject_tf}
							</Atoms.Text.Para>
						</View>
						<View style={styles.buttonsContainer}>
							<TouchableOpacity
								style={styles.button}
								onPress={() =>
									dispatch(
										Actions.WriteQuestion.refreshAskAboutImage()
									)
								}
							>
								<FontAwesome
									name="refresh"
									size={20}
									color="white"
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.button}
								onPress={() =>
									dispatch(
										Actions.Overlay.enqueOverlay([
											OverlayType.askAboutImage,
										])
									)
								}
							>
								<Entypo
									name="resize-full-screen"
									size={20}
									color="white"
								/>
							</TouchableOpacity>
						</View>
						<Image
							style={styles.previewImage}
							source={{ uri: state.image.url }}
						/>
					</View>
					<Atoms.Inputs.Text
						value={state.question}
						placeholder="[[translation:3ac7f23c-c311-4cbc-9ab7-28d504132fa6]]"
						onChange={handleUserInput}
						props={{
							multiline: true,
							numberOfLines: 3,
							style: { height: 110 },
							returnKeyType: "send",
							onSubmitEditing: handleSubmit,
						}}
					/>
				</View>
				<View style={styles.submitButton}>
					<Atoms.Buttons.Emoji
						emoji="🚀"
						onPress={handleSubmit}
						type="highlight"
						size={70}
					/>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default WriteQuestion;
