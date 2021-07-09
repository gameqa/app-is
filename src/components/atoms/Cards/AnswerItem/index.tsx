import React, { useState } from "react";
import { View } from "react-native";
import { Atoms } from "../../..";
import { useDispatch } from "react-redux";
import * as Interface from "./interface";
import styles from "./styles";
import { Answer, User } from "../../../../declerations";
import Api from "../../../../api";
import { useEffect } from "react";
import { Colors } from "../../../../services";
import moment from "moment";
import "moment/locale/is";

const QuestionAnswerCard = (question: Interface.IProps) => {
	const { text, answers: rawAnswers, archived, isImpossible } = question;
	const [answers, setAnswers] = useState<Answer[]>([]);

	moment.locale("is");

	const DEFAULT_SENDER: User = {
		username: "",
		email: "",
		type: "loading",
		_id: "",
		scoreCard: {
			questions: 0,
			answers: 0,
			answerVerifications: 0,
			questionVerifications: 0,
			articles: 0,
			hiscoreRank: -2,
			invites: 0,
		},
		level: 1,
		hasCompletedTutorial: false,
		streak: 1,
	};

	useEffect(() => {
		async function fetchAnswers() {
			try {
				const answers = await Promise.all(
					rawAnswers
						.filter((answer) => !!answer.verifiedAt)
						.map((answer) =>
							Api.get<Answer>(
								`/api/v1/answers/${answer._id}`
							)
						)
				);
				// console.log(answers.map((answer) => answer.data));
				setAnswers(answers.map((answer) => answer.data));
			} catch (error) {
				console.log("ERROR FETCHING ANSWERS", error.message);
			}
		}
		fetchAnswers();
	}, []);

	const RenderErrorMessage = (props: Interface.ErrorProps) => (
		<View
			style={{
				...styles.errorMessageOuter,
				backgroundColor: Colors.MapToDark[props.type],
			}}
		>
			<Atoms.Text.Para
				style={{
					color: Colors.MapToLight[props.type],
				}}
			>
				{props.label}
			</Atoms.Text.Para>
		</View>
	);

	const RenderAnswerAtText = (props: Answer) => {
		let text = "";
		const user = props.createdBy?.username ?? "notandi";

		if (props.type === "unknown") return null;
		if (props.verifiedAt === undefined) text = user;
		else
			text = `${user} svaraði ${moment(props.verifiedAt).fromNow()}`;
		return (
			<Atoms.Text.Para style={styles.answeredAtLabel}>
				{text}
			</Atoms.Text.Para>
		);
	};

	const RenderAnswer = (answer: Answer) => {
		switch (answer.type) {
			case "text-span":
				return (
					<View>
						<Atoms.Cards.ChatBubble
							sender={answer.createdBy ?? DEFAULT_SENDER}
							message={answer.textSpan}
						/>
						<RenderAnswerAtText {...answer} />
					</View>
				);
			case "yes-no":
				return (
					<View>
						<Atoms.Cards.ChatBubble
							sender={answer.createdBy ?? DEFAULT_SENDER}
							message={answer.answerIs ? "Já" : "Nei"}
						/>
						<RenderAnswerAtText {...answer} />
					</View>
				);
			default:
				return (
					<RenderErrorMessage
						{...{ type: "highlight", label: "villa kom upp" }}
					/>
				);
		}
	};


	return (
		<View style={styles.outer}>
			<View>
				<Atoms.Cards.ChatBubble message={text} />
				{archived ? (
					<RenderErrorMessage
						{...{
							type: "danger",
							label: "Annar notandi merkti spurninguna sem slæma",
						}}
					/>
				) : answers.length === 0 ? (
					<RenderErrorMessage
						{...{
							type: "highlight",
							label: "Ekkert svar fundist enn.",
						}}
					/>
				) : (
					answers.map((answer) => <RenderAnswer {...answer} />)
				)}
			</View>
		</View>
	);
};

export default QuestionAnswerCard;
