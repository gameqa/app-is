import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Atoms } from "../../..";
import { useDispatch, useSelector } from "react-redux";
import * as Interface from "./interface";
import styles from "./styles";
import { Answer, User, Question } from "../../../../declerations";
import Api from "../../../../api";
import { useEffect } from "react";
import { Colors } from "../../../../services";
import moment from "moment";
import "moment/locale/is";
import { useNavigation } from "@react-navigation/native";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";

const QuestionAnswerCard = (question: Interface.IProps) => {
	const {
		text,
		answers: rawAnswers,
		archived,
		isImpossible,
		_id,
	} = question;
	const [answers, setAnswers] = useState<Answer[]>([]);

	const navigation = useNavigation();
	const dispatch = useDispatch();

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
		resetCount: 0,
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
		const user = props.createdBy?.username ?? "[[translation:00918805-65ec-4530-bd73-8bf08face8b4]]";

		if (props.type === "unknown") return null;
		if (props.verifiedAt === undefined) text = user;
		else
			text = `${user} [[translation:5ba54eb3-1517-4379-8a2d-1bd80ce7758b]] ${moment(props.verifiedAt).fromNow()}`;
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
							message={answer.answerIs ? "[[translation:17b6284a-7cac-430b-9815-705e1737a072]]" : "[[translation:b1e80198-9c0f-433b-b352-0a7d84dbc635]]"}
						/>
						<RenderAnswerAtText {...answer} />
					</View>
				);
			default:
				return (
					<RenderErrorMessage
						{...{ type: "highlight", label: "[[translation:2e222ada-7c4c-4d4d-a131-c84d5f160cef]]" }}
					/>
				);
		}
	};

	const setImpossibleQuestion = () => {
		dispatch(Actions.GoogleSearch.setImpossibleQuestion(question));
		navigation.navigate("Google");
	};

	const RenderButton = () => (
		<TouchableOpacity onPress={() => setImpossibleQuestion()}>
			<Atoms.Cards.ChatBubble
				message={
					"❌ [[translation:c2b441ce-7f73-4664-a51f-067601786e1d]]. \n\n 🔎 Ýttu hér til að finna svarið sjálf/ur"
				}
				isInbound
			/>
		</TouchableOpacity>
	);

	return (
		<View style={styles.outer}>
			<View>
				<Atoms.Cards.ChatBubble message={text} />
				{isImpossible ? (
					<React.Fragment>
						{/* <RenderErrorMessage
							{...{
								type: "warning",
								label: "Notandi fann ekki svarið á Google",
							}}
						/> */}
						<RenderButton />
					</React.Fragment>
				) : archived ? null : answers.length === 0 ? (
					<RenderErrorMessage
						{...{
							type: "highlight",
							label: "[[translation:c2b441ce-7f73-4664-a51f-067601786e1d]]",
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
