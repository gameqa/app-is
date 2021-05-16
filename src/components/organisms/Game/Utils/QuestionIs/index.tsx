import React from "react";
import { Atoms } from "../../../..";
import { IProps } from "./interface";
import styles from "./styles";
const QuestionIs = ({ question }: IProps) => {
	return (
		<Atoms.Text.Heading style={styles.heading}>
			Spurningin er „{question}“
		</Atoms.Text.Heading>
	);
};

export default QuestionIs;
