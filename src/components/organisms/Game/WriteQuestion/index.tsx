import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import styles from "./styles";
import * as Actions from "../../../../actions";
import { submitQuestion } from "../../../../actions/game";

const WriteQuestion = () => {
	const state = useSelector((state: StoreState) => state.writeQuestion);
	const { _id: gameRoundId } = useSelector((state: StoreState) => state.game);

	const [errorMessage, setErrorMessage] = useState("");
	const dispatch = useDispatch();

	const handleUserInput = (text: string) =>
		dispatch(Actions.WriteQuestion.writeQuestion(text));

	const isYesNoQuestion = state.questionType === "Já/Nei";

	const handleSubmit = () => {
		const MIN_QUESTION_LENGTH = 13;
		try {
			if (state.question.length < MIN_QUESTION_LENGTH)
				throw new Error(`Spurningin er ekki nógu löng`);
			if (state.question.slice(-1) !== "?")
				throw new Error(`Spurningin verður að enda á spurningarmerki`);
			setErrorMessage("");
			dispatch(submitQuestion(gameRoundId, state.question, isYesNoQuestion));
		} catch (e) {
			setErrorMessage(e.message);
		}
	};

	return (
		<View style={styles.flex}>
			{isYesNoQuestion ? (
				<Atoms.Alerts.Ribbon
					item={{ type: "highlight", label: "Skrifaðu já / nei spurningu" }}
				/>
			) : null}
			<Atoms.Text.Para style={styles.marginTop}>
				Skrifaðu spurningu sem aðrir notendur geta fundið svarið við. Reyndu að velja
				spurningu sem er ekki háð tilfinningum fólks eða hvaða dag vikunnar er spurt.
				Einnig er best að spurningarnar séu settar fram á óformlegu máli.
			</Atoms.Text.Para>
			<Atoms.Text.Para style={styles.marginTop}>
				Handhófskenndar hugmyndir sem þú getur spurt útí: {state.ideaWords.join(", ")}
			</Atoms.Text.Para>
			<View style={styles.marginTop}>
				<Atoms.Inputs.Text
					value={state.question}
					placeholder="Skrifaðu spurninguna hér"
					onChange={handleUserInput}
					props={{ multiline: true, numberOfLines: 3, style: { height: 75 } }}
				/>
			</View>

			<View style={[styles.flex, styles.justEnd]}>
				<Atoms.Buttons.Base label="Senda" onPress={handleSubmit} type="highlight" />
			</View>
		</View>
	);
};

export default WriteQuestion;
