import React from "react";
import { Atoms } from "../../../..";
import { IProps } from "./interface";
import styles from "./styles";
const QuestionIs = ({ question, center }: IProps) => {
	return (
		<Atoms.Text.Heading
			style={{
				...styles.heading,
				...(center ? { textAlign: "center" } : {}),
			}}
		>
			[[translation:43a56caf-107e-4148-b94d-0e6fd43019ab]] „{question}“
		</Atoms.Text.Heading>
	);
};

export default QuestionIs;
