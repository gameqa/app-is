import React from "react";
import { Atoms } from "../../../..";
import { IProps } from "./interface";

const QuestionIs = ({ question }: IProps) => {
	return <Atoms.Text.Heading>Spurningin er „{question}“</Atoms.Text.Heading>;
};

export default QuestionIs;
