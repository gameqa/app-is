import React from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Atoms, Molecules, Organisms } from "../../components";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { FontAwesome } from "@expo/vector-icons";
import LayoutWrapper from "../../layout";
import { logOutUser } from "../../actions/auth";
import { ScrollView } from "react-native-gesture-handler";
import * as Hooks from "../../hooks";
import * as Actions from "../../actions";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const chartData = useSelector((state: StoreState) => state.chartData);

	const dispatch = useDispatch();

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

				<Atoms.Text.Heading style={styles.padTitleTop}>
					Minn árangur
				</Atoms.Text.Heading>
				<Organisms.Users.ScoreCard {...auth} />
			</LayoutWrapper>
		</ScrollView>
	);
};

export default UserProgress;
