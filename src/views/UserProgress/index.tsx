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

	const [answerTypeViewSelected, setAnswerTypeViewSelected] = useState();

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
		if (unSeenAnswers) {
			setHasUnseenAnswers(true);
		}
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
				<ScrollView
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					contentContainerStyle={{
						alignItems: "center",
						marginBottom: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => console.log("Pressed")}
						style={{
							height: 80,
							width: 120,
							borderRadius: 7,
							backgroundColor:
								Services.Colors.MapToLight.highlight,
							marginRight: 20,
							justifyContent: "center",
							padding: 10,
						}}
					>
						<Atoms.Text.Para
							style={{
								fontSize: 28,
								fontWeight: "500",
								color: Services.Colors.MapToDark.highlight,
								margin: 0,
								textAlign: "center",
							}}
						>
							4
						</Atoms.Text.Para>
						<Atoms.Text.Para
							style={{
								fontSize: 14,
								fontWeight: "500",
								marginTop: 5,
								color: Services.Colors.MapToDark.highlight,
								margin: 0,
								textAlign: "center",
							}}
						>
							Svör
						</Atoms.Text.Para>
						<View
							style={{
								position: "absolute",
								left: 5,
								top: 5,
							}}
						>
							<Atoms.Text.Para>💡</Atoms.Text.Para>
						</View>
						<View
							style={{
								position: "absolute",
								left: 5,
								bottom: 5,
							}}
						>
							<Atoms.Text.Para>💡</Atoms.Text.Para>
						</View>
						<View
							style={{
								position: "absolute",
								right: 5,
								top: 5,
							}}
						>
							<Atoms.Text.Para>💡</Atoms.Text.Para>
						</View>
						<View
							style={{
								position: "absolute",
								right: 5,
								bottom: 5,
							}}
						>
							<Atoms.Text.Para>💡</Atoms.Text.Para>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => console.log("Pressed")}
						style={{
							height: 80,

							width: 120,
							marginRight: 20,
							justifyContent: "center",
							padding: 10,
							borderRadius: 7,
							borderWidth: 1,
							borderColor: "#dedede",
						}}
					>
						<Atoms.Text.Para
							style={{
								fontSize: 28,
								fontWeight: "500",
								color: Services.Colors.MapToDark[
									"dark-grey"
								],
								margin: 0,
								textAlign: "center",
							}}
						>
							3
						</Atoms.Text.Para>
						<Atoms.Text.Para
							style={{
								fontSize: 14,
								fontWeight: "500",
								marginTop: 5,
								color: Services.Colors.MapToDark[
									"dark-grey"
								],
								margin: 0,
								textAlign: "center",
							}}
						>
							Ekkert svar
						</Atoms.Text.Para>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => console.log("Pressed")}
						style={{
							height: 80,
							width: 120,
							marginRight: 20,
							justifyContent: "center",
							padding: 10,
							borderRadius: 7,
							borderWidth: 1,
							borderColor: "#dedede",
						}}
					>
						<Atoms.Text.Para
							style={{
								fontSize: 28,
								fontWeight: "500",
								color: Services.Colors.MapToDark[
									"dark-grey"
								],
								margin: 0,
								textAlign: "center",
							}}
						>
							14
						</Atoms.Text.Para>
						<Atoms.Text.Para
							style={{
								fontSize: 14,
								fontWeight: "500",
								marginTop: 5,
								color: Services.Colors.MapToDark[
									"dark-grey"
								],
								margin: 0,
								textAlign: "center",
							}}
						>
							Í vinnslu
						</Atoms.Text.Para>
					</TouchableOpacity>
				</ScrollView>

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
						{/* <Atoms.Text.Para
							style={{
								backgroundColor: "red",
								paddingHorizontal: 10,
							}}
						>
							Gömul svör
						</Atoms.Text.Para> */}
						{/* <View
							style={{
								flex: 3,
								flexDirection: "row",
								justifyContent: "center",
							}}
						>
							<View style={styles.unSeenLine}></View>
							<Atoms.Text.Para
								style={{
									backgroundColor: "red",
									paddingHorizontal: 10,
								}}
							>
								Gömul svör
							</Atoms.Text.Para>
							<View style={}></View>
						</View> */}
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
