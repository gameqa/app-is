import React, { useState, useEffect } from "react";
import {
	View,
	Alert,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { QuestionAnswerItem } from "../../components/atoms/Cards";
import api from "../../api";
import * as Utils from "./utils";
import { Colors } from "react-native/Libraries/NewAppScreen";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const [currentScreen, setCurrentScreen] =
		useState<Utils.Screens>("in-progress");

	const [hasUnseenAnswers, setHasUnseenAnswers] = useState(false);

	const myQuestions = useSelector(
		(state: StoreState) => state.myQuestions
	);
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const ANSWER = "answer";
	const IN_PROGRESS = "in-progress";
	const NO_ANSWERS = "no-answers";

	const questionsWithAnswers = React.useMemo(
		() =>
			Services.FilterMyQuestions.questionsWithAnswers(
				myQuestions.questions
			),
		[myQuestions.questions]
	);

	const questionsWithNoAnswers = React.useMemo(
		() =>
			Services.FilterMyQuestions.questionsWithNoAnswers(
				myQuestions.questions
			),
		[myQuestions.questions]
	);
	const questionsInProgress = React.useMemo(
		() =>
			Services.FilterMyQuestions.questionsInProgress(
				myQuestions.questions
			),
		[myQuestions.questions]
	);

	const questionWithUnseenAnswers = React.useMemo(() => {
		const unSeenAnswers = Services.FilterMyQuestions.questionsUnseen(
			questionsWithAnswers
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
		const unSeenAnswers = Services.FilterMyQuestions.questionsUnseen(
			questionsWithAnswers
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
			return () => {
				dispatch(Actions.MyQuestions.fetchMyQuestions());
			};
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
			const markAnswersAsSeen = async () => {
				try {
					await Promise.all(
						answerIds.map((answerId) =>
							api.patch(`/api/v1/answers/${answerId}`, {
								seenByQuestionerAt: new Date(),
							})
						)
					);
				} catch (error) {
					//
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
		Alert.alert("[[translation:9d378a47-8350-4ade-8f4b-10f7ba5488d0]]", "[[translation:54d10c8b-e468-4566-ae52-bc0b4bb454dc]]", [
			{
				text: "[[translation:b1e80198-9c0f-433b-b352-0a7d84dbc635]]",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "[[translation:17b6284a-7cac-430b-9815-705e1737a072]]", onPress: () => dispatch(logOutUser()) },
		]);

	// fired when notification is received while app is open
	Hooks.Notifications.useNotificationListener((item) => {
		// console.log("NEW NOTIFICATION:", item);
	});

	// fired when notification response is received
	Hooks.Notifications.useResponseListener((response) => {
		// console.log("NEW NOTIFICATION RESPONSE:", response);
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

	const RenderButton = (props: Utils.ButtonItem) => (
		<TouchableOpacity
			onPress={() => setCurrentScreen(props.screenId)}
			style={currentScreen === props.screenId ? styles.selectViewButtonSelected : styles.selectViewButton}
		>
			{props.screenId === "answer" ? (
				<Atoms.Text.Para style={styles.answerCount}>
					{questionWithUnseenAnswers.length +
						questionsWithAnswers.length}
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
					<View style={styles.bottomRightCorner}>
						<Atoms.Text.Para>{props.emoji}</Atoms.Text.Para>
					</View>
					
				</React.Fragment>
			) : null}
		</TouchableOpacity>
	);

	const UnSeenTextPrompt = () => (
		<>
			{hasUnseenAnswers ? (
				<View style={styles.unSeenAnswerContainer}>
					<View style={styles.unSeenAnswerline}></View>
					<View style={styles.unSeenTextContainer}>
						<Atoms.Text.Para style={styles.unSeenText}>
						[[translation:a197b9af-1812-4cef-9d50-c46dc49bc4e2]]
						</Atoms.Text.Para>
					</View>

					<View style={styles.unSeenAnswerline}></View>
				</View>
			) : null}
		</>
	);

	const sortFlatListData = (data: QuestionWithAnswers[]) => {
		return data.sort((a, b) => {
			if (a._id < b._id) return 1;
			if (a._id > b._id) return -1;
			return 0;
		});
	};

	const RenderScreen = () => {
		switch (currentScreen) {
			case ANSWER:
				return (
					<React.Fragment>
						{/* Render all questions that have an unseen answer first */}
						<FlatList
							data={sortFlatListData(
								questionWithUnseenAnswers
							)}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
						<UnSeenTextPrompt />
						{/* Render next all questions that have only seen answers */}
						<FlatList
							data={sortFlatListData(
								questionWithOnlySeenAnswers
							)}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
					</React.Fragment>
				);
			case NO_ANSWERS:
				return (
					<React.Fragment>
						<Atoms.Text.Para style={{}}>
						[[translation:74332ff0-bea7-4b49-9992-7ebee1c9a5d4]]
						[[translation:ce9b3903-f33a-4ae6-b932-3ff5ffa06bd9]][[translation:f0a05edd-4af1-4cb2-92ce-cc1de6bb6423]]
						</Atoms.Text.Para>
						{/* Render all questions that have an unseen answer first */}
						<FlatList
							data={sortFlatListData(
								questionsWithNoAnswersNotSeen
							)}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
						<UnSeenTextPrompt />

						{/*Render next all questions that have only seen answers */}
						 <FlatList
							data={sortFlatListData(questionsWithNoAnswers)}
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
							data={sortFlatListData(questionsInProgress)}
							keyExtractor={extractKey}
							renderItem={renderQuestionItem}
						/>
					</React.Fragment>
				);
		}
	};
	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
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
				<View
					style={styles.scrollContainer}
				>
					{Utils.BUTTONS.map((button) => (
						<RenderButton {...button} key={button.screenId}/>
					))}
				</View>

				{myQuestions.isLoading ? (
					<ActivityIndicator />
				) : myQuestions.questions.length === 0 ? (
					<React.Fragment>
						<Atoms.Cards.ChatBubble message="[[translation:80a9c4a8-ca73-4819-ad5c-53d0ac4215a9]]" />
						<Atoms.Buttons.Base
							type={"highlight"}
							label={"[[translation:e7b7d7ef-397a-4f09-a408-16fdabd6a0c4]]"}
							onPress={() => navigation.navigate("[[translation:ca5523c3-7fcb-487c-8e2c-64e992eafefc]]")}
						/>
					</React.Fragment>
				) : (
					<RenderScreen />
				)}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default UserProgress;
