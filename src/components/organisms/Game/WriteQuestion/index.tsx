import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import styles from "./styles";
import * as Actions from "../../../../actions";
import { submitQuestion } from "../../../../actions/game";
import { Alert } from "../../../../declerations";
import { Utils } from "../";

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
				throw new Error(`Spurningin er ekki nógu löng`);
			if (question.slice(-1) !== "?")
				throw new Error(
					`Spurningin verður að enda á spurningarmerki`
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
		<View style={styles.flex}>
			<Atoms.Alerts.Ribbon
				item={
					isYesNoQuestion
						? {
								type: "success",
								label: "Skrifaðu já / nei spurningu",
						  }
						: {
								type: "warning",
								label: "Ekki skrifa já / nei spurningu",
						  }
				}
			/>
			<Atoms.Alerts.Ribbon item={error} />
			<Utils.Explain>
				Skrifaðu spurningu sem aðrir notendur geta fundið svarið
				við. Reyndu að velja spurningu sem er ekki háð tilfinningum
				fólks eða hvaða dag vikunnar er spurt. Einnig er best að
				spurningarnar séu settar fram á óformlegu máli.
			</Utils.Explain>
			<Atoms.Text.Para style={styles.marginTop}>
				Handhófskenndar hugmyndir sem þú getur spurt útí:{" "}
				{state.ideaWords.join(", ")}
			</Atoms.Text.Para>
			<View style={styles.marginTop}>
				<Atoms.Inputs.Text
					value={state.question}
					placeholder="Skrifaðu spurninguna hér"
					onChange={handleUserInput}
					props={{
						multiline: true,
						numberOfLines: 3,
						style: { height: 75 },
						returnKeyType: "send",
						onSubmitEditing: handleSubmit,
					}}
				/>
			</View>

			<View style={[styles.flex, styles.justEnd]}>
				<Atoms.Buttons.Base
					label="Senda"
					onPress={handleSubmit}
					type="highlight"
				/>
			</View>
		</View>
	);
};

export default WriteQuestion;
