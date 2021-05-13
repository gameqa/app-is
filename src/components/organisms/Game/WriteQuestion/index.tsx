import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import styles from "./styles";
import * as Actions from "../../../../actions";

const WriteQuestion = () => {
	const state = useSelector((state: StoreState) => state.writeQuestion);
	const dispatch = useDispatch();

	const handleUserInput = (text: string) =>
		dispatch(Actions.WriteQuestion.writeQuestion(text));

	return (
		<View style={styles.flex}>
			<Atoms.Text.Para style={styles.marginTop}>
				Skrifaðu spurningu sem aðrir notendur geta fundið svarið við. Reyndu að velja
				spurningu sem er ekki háð tilfinningum fólks eða hvaða dag vikunnar er spurt.
				Einnig er best að spurningarnar séu spurðar á óformlegu, svipað og þú myndir
				sjálf/ur spyrja í upphátt.
			</Atoms.Text.Para>
			<Atoms.Text.Para style={styles.marginTop}>
				Þú getur til dæmis spurt um: {state.ideaWords.join(", ")}
			</Atoms.Text.Para>
			<View style={styles.marginTop}>
				<Atoms.Inputs.Text
					value={state.question}
					placeholder="MISSING PLACEHOLDER"
					onChange={handleUserInput}
				/>
			</View>
			<View>
				<Atoms.Buttons.Base label="Senda" onPress={() => null} type="highlight" />
			</View>
		</View>
	);
};

export default WriteQuestion;
