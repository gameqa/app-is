import React, { useState } from "react";
import { View } from "react-native";
import { Atoms } from "../../..";
import { useDispatch } from "react-redux";
import { IProps } from "./interface";
import styles from "./styles";
import { Answer, User } from "../../../../declerations";
import Api from "../../../../api";
import { useEffect } from "react";

const QuestionAnswerCard = (question: IProps) => {
	const { _id, isYesOrNo, text, answers: rawAnswers } = question;
	const [answers, setAnswers] = useState<Answer[]>([]);

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
				console.log(answers.map((answer) => answer.data));
				setAnswers(answers.map((answer) => answer.data));
			} catch (error) {
				console.log("ERROR FETCHING ANSWERS", error.message);
			}
		}
		fetchAnswers();
	}, []);

	const RenderNoAnswerPrompt = () => (
		<View
			style={{
				padding: 5,
				borderRadius: 5,
				backgroundColor: "#e3e3e3",
				marginTop: 7,
			}}
		>
			<Atoms.Text.Para>Ekkert svar fundist enn</Atoms.Text.Para>
		</View>
	);

	const RenderAnswer = (answer: Answer) => {
		switch (answer.type) {
			case "text-span":
				return (
					<View>
						<Atoms.Cards.ChatBubble
							sender={answer.createdBy ?? DEFAULT_SENDER}
							message={answer.textSpan}
						/>
						<Atoms.Text.Para
							style={{ fontSize: 9, textAlign: "right" }}
						>
							{answer.createdBy
								? `${answer.createdBy.username} svaraði 04.09 kl 12.00 `
								: "Svar barst 11.11 kl 23:30"}
							{/* Breki s */}
						</Atoms.Text.Para>
					</View>
				);
			case "yes-no":
				return (
					<View>
						<Atoms.Cards.ChatBubble
							sender={answer.createdBy ?? DEFAULT_SENDER}
							message={answer.answerIs ? "Já" : "Nei"}
						/>
						<Atoms.Text.Para
							style={{ fontSize: 9, textAlign: "right" }}
						>
							{answer.createdBy
								? `${answer.createdBy.username} svaraði 04.09 kl 12.00 `
								: "Svar barst 11.11 kl 23:30"}
						</Atoms.Text.Para>
					</View>
				);
			default:
				return <RenderNoAnswerPrompt />;
		}
	};

	return (
		<View style={styles.outer}>
			<View>
				<Atoms.Cards.ChatBubble message={text} />
				{answers.length === 0 ? (
					<RenderNoAnswerPrompt />
				) : (
					answers.map((answer) => <RenderAnswer {...answer} />)
				)}
			</View>
		</View>
	);
};

export default QuestionAnswerCard;
