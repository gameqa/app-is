import React, { useState } from "react";
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

const UserProgress = () => {
	const [hasUnseenAnswers, setHasUnseenAnswers] = useState(false);

	const auth = useSelector((state: StoreState) => state.auth);

	const myQuestions = useSelector(
		(state: StoreState) => state.myQuestions
	);
	const dispatch = useDispatch();

	const answeredQuestions = React.useMemo(
		() =>
			myQuestions.questions
				.filter((question) => question.answers.length)
				.sort((a, b) => {
					if (a._id < b._id) return 1;
					if (a._id > b._id) return -1;
					return 0;
				}),
		[myQuestions.questions]
	);

	const questionWithUnseenAnswers = React.useMemo(() => {
		const unSeenAnswers = answeredQuestions.filter((question) =>
			question.answers.some((answer) => !answer.seenByQuestionerAt)
		);
		setHasUnseenAnswers(unSeenAnswers.length > 0);
		return unSeenAnswers;
	}, [answeredQuestions]);

	const questionWithOnlySeenAnswers = React.useMemo(() => {
		return answeredQuestions.filter((question) =>
			question.answers.every((answer) => !!answer.seenByQuestionerAt)
		);
	}, [answeredQuestions]);

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

				{myQuestions.isLoading ? (
					<ActivityIndicator />
				) : myQuestions.questions.length === 0 ? (
					<React.Fragment>
						<Atoms.Cards.ChatBubble message="Þú hefur ekki spurt neinar spurningar enn þá. Þínar spurningar birtast hér." />
					</React.Fragment>
				) : (
					<React.Fragment>
						{/* Render all questions that have an unseen answer first */}
						<FlatList
							data={questionWithUnseenAnswers}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
						{hasUnseenAnswers ? (
							<View style={styles.unSeenAnswerContainer}>
								<View
									style={styles.unSeenAnswerline}
								></View>
								<View style={styles.unSeenTextContainer}>
									<Atoms.Text.Para
										style={styles.unSeenText}
									>
										Gömul svör
									</Atoms.Text.Para>
								</View>

								<View
									style={styles.unSeenAnswerline}
								></View>
							</View>
						) : null}

						{/* Render next all questions that have only seen answers */}
						<FlatList
							data={questionWithOnlySeenAnswers}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
					</React.Fragment>
				)}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default UserProgress;
