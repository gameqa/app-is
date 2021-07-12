import React, { useState, useEffect } from "react";
import {
	View,
	Alert,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Atoms, Molecules, Organisms } from "../../components";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { FontAwesome } from "@expo/vector-icons";
import LayoutWrapper from "../../layout";
import { logOutUser } from "../../actions/auth";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import * as Hooks from "../../hooks";
import * as Actions from "../../actions";
import { QuestionWithAnswers } from "../../declerations";
import { useFocusEffect } from "@react-navigation/native";
import { QuestionAnswerItem } from "../../components/atoms/Cards";
import api from "../../api";

import * as Utils from "./utils";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const [currentScreen, setCurrentScreen] =
		useState<Utils.Screens>("answer");

	const [hasUnseenAnswers, setHasUnseenAnswers] = useState(false);

	const myQuestions = useSelector(
		(state: StoreState) => state.myQuestions
	);
	const dispatch = useDispatch();

	const ANSWER = "answer";
	const IN_PROGRESS = "in-progress";
	const NO_ANSWERS = "no-answers";

	const questionsWithAnswers = React.useMemo(
		() => myQuestions.questions.filter(Utils.FILTER_HAS_ANSWER),
		[myQuestions.questions]
	);

	const questionsWithNoAnswers = React.useMemo(
		() => myQuestions.questions.filter(Utils.FILTER_HAS_NO_ANSWER),
		[myQuestions.questions]
	);
	const questionsInProgress = React.useMemo(
		() => myQuestions.questions.filter(Utils.FILTER_IS_IN_PROGRESS),
		[myQuestions.questions]
	);

	const questionWithUnseenAnswers = React.useMemo(() => {
		const unSeenAnswers = questionsWithAnswers.filter((question) =>
			question.answers.some((answer) => !answer.seenByQuestionerAt)
		);
		setHasUnseenAnswers(unSeenAnswers.length > 0);
		return unSeenAnswers;
	}, [myQuestions.questions, currentScreen]);

	const questionWithOnlySeenAnswers = React.useMemo(() => {
		return questionsWithAnswers.filter((question) =>
			question.answers.every((answer) => !!answer.seenByQuestionerAt)
		);
	}, [myQuestions.questions, currentScreen]);

	const questionsWithNoAnswersNotSeen = React.useMemo(() => {
		const unSeenAnswers = questionsWithAnswers.filter((question) =>
			question.answers.some((answer) => !answer.seenByQuestionerAt)
		);
		setHasUnseenAnswers(unSeenAnswers.length > 0);
		return unSeenAnswers;
	}, [myQuestions.questions, currentScreen]);

	const questionsWithNoAnswersSeen = React.useMemo(() => {
		return questionsWithNoAnswers.filter((question) =>
			question.answers.every((answer) => !!answer.seenByQuestionerAt)
		);
	}, [myQuestions.questions, currentScreen]);

	useFocusEffect(
		React.useCallback(() => {
			dispatch(Actions.MyQuestions.fetchMyQuestions());
		}, [])
	);

	useFocusEffect(
		React.useCallback(() => {
			const answerIds = questionWithUnseenAnswers.reduce<string[]>(
				(prev, curr) => [
					...prev,
					...curr.answers.map((item) => item._id),
				],
				[]
			);
			console.log(answerIds);
			const markAnswersAsSeen = async () => {
				try {
					await Promise.all(
						answerIds.map((answerId) =>
							api.patch(`/api/v1/answers/${answerId}`, {
								seenByQuestionerAt: new Date(),
							})
						)
					);
					console.log("done with patches");
				} catch (error) {
					console.log(error);
					console.log("ERROR MARKANSWERASSEEN");
				}
			};

			const TIMEOUT_LENGTH = 4000;
			const t = setTimeout(markAnswersAsSeen, TIMEOUT_LENGTH);

			return () => {
				clearTimeout(t);
			};
		}, [questionWithUnseenAnswers])
	);

	useFocusEffect(
		React.useCallback(() => {
			const answerIds = questionsWithNoAnswersNotSeen.reduce<
				string[]
			>(
				(prev, curr) => [
					...prev,
					...curr.answers.map((item) => item._id),
				],
				[]
			);
			console.log(answerIds);
			const markAnswersAsSeen = async () => {
				try {
					await Promise.all(
						answerIds.map((answerId) =>
							api.patch(`/api/v1/answers/${answerId}`, {
								seenByQuestionerAt: new Date(),
							})
						)
					);
					console.log("done with patches");
				} catch (error) {
					console.log(error);
					console.log("ERROR MARKANSWERASSEEN");
				}
			};

			const TIMEOUT_LENGTH = 4000;
			const t = setTimeout(markAnswersAsSeen, TIMEOUT_LENGTH);

			return () => {
				clearTimeout(t);
			};
		}, [questionsWithNoAnswersNotSeen])
	);

	const alertSignOut = () =>
		Alert.alert("Útskráning", "Viltu skrá þig út?", [
			{
				text: "Nei",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "Já", onPress: () => dispatch(logOutUser()) },
		]);

	// fired when notification is received while app is open
	Hooks.Notifications.useNotificationListener((item) => {
		console.log("NEW NOTIFICATION:", item);
	});

	// fired when notification response is received
	Hooks.Notifications.useResponseListener((response) => {
		console.log("NEW NOTIFICATION RESPONSE:", response);
	});

	// handle get permission
	Hooks.Notifications.useRequestPermission((token) => {
		dispatch(
			Actions.PushNotification.sendPushNotificationToken(token)
		);
	});
	const renderQuestionItem = (result: { item: QuestionWithAnswers }) => (
		<Atoms.Cards.QuestionAnswerItem {...result.item} />
	);

	const extractKey = (item: QuestionWithAnswers) => item._id;

	const RenderButton = React.useCallback(
		(props: Utils.ButtonItem) => (
			<TouchableOpacity
				onPress={() => setCurrentScreen(props.screenId)}
				style={styles.selectViewButton}
			>
				{props.screenId === "answer" ? (
					<Atoms.Text.Para style={styles.answerCount}>
						{questionWithUnseenAnswers.length +
							questionWithOnlySeenAnswers.length}
					</Atoms.Text.Para>
				) : props.screenId === "no-answers" ? (
					<Atoms.Text.Para style={styles.answerCount}>
						{questionsWithNoAnswersNotSeen.length +
							questionsWithNoAnswersSeen.length}
					</Atoms.Text.Para>
				) : (
					<Atoms.Text.Para style={styles.answerCount}>
						{questionsInProgress.length}
					</Atoms.Text.Para>
				)}

				<Atoms.Text.Para style={styles.buttonLabel}>
					{props.text}
				</Atoms.Text.Para>
				{currentScreen === props.screenId ? (
					<React.Fragment>
						<View style={styles.topLeftCorner}>
							<Atoms.Text.Para>
								{props.emoji}
							</Atoms.Text.Para>
						</View>
						<View style={styles.bottomLeftCorner}>
							<Atoms.Text.Para>
								{props.emoji}
							</Atoms.Text.Para>
						</View>
						<View style={styles.bottomRightCorner}>
							<Atoms.Text.Para>
								{props.emoji}
							</Atoms.Text.Para>
						</View>
						<View style={styles.topRightCorner}>
							<Atoms.Text.Para>
								{props.emoji}
							</Atoms.Text.Para>
						</View>
					</React.Fragment>
				) : null}
			</TouchableOpacity>
		),
		[currentScreen]
	);

	const UnSeenTextPrompt = () => (
		<>
			{hasUnseenAnswers ? (
				<View style={styles.unSeenAnswerContainer}>
					<View style={styles.unSeenAnswerline}></View>
					<View style={styles.unSeenTextContainer}>
						<Atoms.Text.Para style={styles.unSeenText}>
							Gömul svör
						</Atoms.Text.Para>
					</View>

					<View style={styles.unSeenAnswerline}></View>
				</View>
			) : null}
		</>
	);

	const RenderScreen = () => {
		switch (currentScreen) {
			case ANSWER:
				return (
					<React.Fragment>
						{/* Render all questions that have an unseen answer first */}
						<FlatList
							data={questionWithUnseenAnswers}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
						<UnSeenTextPrompt />
						{/* Render next all questions that have only seen answers */}
						<FlatList
							data={questionWithOnlySeenAnswers}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
					</React.Fragment>
				);
			case NO_ANSWERS:
				return (
					<React.Fragment>
						{/* Render all questions that have an unseen answer first */}
						<FlatList
							data={questionsWithNoAnswersNotSeen}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
						<UnSeenTextPrompt />

						{/* Render next all questions that have only seen answers */}
						<FlatList
							data={questionsWithNoAnswersSeen}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
					</React.Fragment>
				);
			case IN_PROGRESS:
				return (
					<React.Fragment>
						{/* Render all questions that have an unseen answer first */}
						<FlatList
							data={questionsInProgress}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
					</React.Fragment>
				);
		}
	};
	return (
		<ScrollView>
			<LayoutWrapper>
				<View>
					<Molecules.Users.Info {...auth} />
					<TouchableOpacity
						onPress={alertSignOut}
						style={styles.lock}
					>
						<FontAwesome
							name="lock"
							size={20}
							color={Services.Colors.MapToDark["grey"]}
						/>
					</TouchableOpacity>
				</View>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					contentContainerStyle={styles.scrollContainer}
				>
					{Utils.BUTTONS.map((button) => (
						<RenderButton {...button} />
					))}
				</ScrollView>

				{myQuestions.isLoading ? (
					<ActivityIndicator />
				) : myQuestions.questions.length === 0 ? (
					<React.Fragment>
						<Atoms.Cards.ChatBubble message="Þú hefur ekki spurt neinar spurningar enn þá. Þínar spurningar birtast hér." />
					</React.Fragment>
				) : (
					<RenderScreen />
				)}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default UserProgress;

// const questions = React.useMemo(() => {
// 	switch (currentScreen) {
// 		case ANSWER:
// 			return myQuestions.questions
// 				.filter((question) => question.answers.length)
// 				.sort((a, b) => {
// 					if (a._id < b._id) return 1;
// 					if (a._id > b._id) return -1;
// 					return 0;
// 				});
// 		case IN_PROGRESS:
// 			return myQuestions.questions
// 				.filter(
// 					(question) =>
// 						question.answers.length === 0 &&
// 						!question.archived
// 				)
// 				.sort((a, b) => {
// 					if (a._id < b._id) return 1;
// 					if (a._id > b._id) return -1;
// 					return 0;
// 				});

// 		case NO_ANSWERS:
// 			return myQuestions.questions
// 				.filter(
// 					(question) =>
// 						question.isImpossible || question.archived
// 				)
// 				.sort((a, b) => {
// 					if (a._id < b._id) return 1;
// 					if (a._id > b._id) return -1;
// 					return 0;
// 				});

// 		default:
// 			return myQuestions.questions
// 				.filter((question) => question.answers.length)
// 				.sort((a, b) => {
// 					if (a._id < b._id) return 1;
// 					if (a._id > b._id) return -1;
// 					return 0;
// 				});
// 	}
// }, [myQuestions.questions, currentScreen]);

// const inProgressQuestions = React.useMemo(
// 	() =>
// 		myQuestions.questions
// 			.filter(
// 				(question) =>
// 					question.answers.length === 0 && !question.archived
// 			)
// 			.sort((a, b) => {
// 				if (a._id < b._id) return 1;
// 				if (a._id > b._id) return -1;
// 				return 0;
// 			}),
// 	[myQuestions.questions]
// );

// const filterQuestions = () => {
// 	switch (currentScreen) {
// 		case "answer":
// 			console.log("eg er jer");
// 			return myQuestions.questions.filter(
// 				(question) => question.answers.length
// 			);
// 		// .sort((a, b) => {
// 		// 	if (a._id < b._id) return 1;
// 		// 	if (a._id > b._id) return -1;
// 		// 	return 0;
// 		// });

// 		case "in-progress":
// 			console.log("tetstst");
// 			return myQuestions.questions.filter(
// 				(question) =>
// 					question.answers.length === 0 && !question.archived
// 				// !(question.isImpossible || question.archived)
// 			);
// 		// .sort((a, b) => {
// 		// 	if (a._id < b._id) return 1;
// 		// 	if (a._id > b._id) return -1;
// 		// 	return 0;
// 		// });

// 		case "no-answers":
// 			return myQuestions.questions.filter(
// 				(question) =>
// 					question.isImpossible || question.archived
// 			);
// 		// .sort((a, b) => {
// 		// 	if (a._id < b._id) return 1;
// 		// 	if (a._id > b._id) return -1;
// 		// 	return 0;
// 		// });
// 		default:
// 			return myQuestions.questions;
// 	}
// };
