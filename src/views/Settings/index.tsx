import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Atoms, Molecules } from "../../components";
import { StoreState } from "../../reducers";
import LayoutWrapper from "../../layout";
import * as Actions from "../../actions";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {

	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();
	const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleLogOut = () => {
		Alert.alert("[[translation:9d378a47-8350-4ade-8f4b-10f7ba5488d0]]", "[[translation:54d10c8b-e468-4566-ae52-bc0b4bb454dc]]", [
			{
				text: "[[translation:b1e80198-9c0f-433b-b352-0a7d84dbc635]]",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "[[translation:17b6284a-7cac-430b-9815-705e1737a072]]", onPress: () => dispatch(Actions.Auth.logOutUser()) },
		]);
    }

    const handleDeleteAccount = () => {
		Alert.alert("[[translation:f369db68-01bc-4bc1-8baa-773d3ab052ea]]", "[[translation:0942cee5-457b-4d3b-912a-d6305647df37]]", [
			{
				text: "[[translation:b1e80198-9c0f-433b-b352-0a7d84dbc635]] ",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "[[translation:17b6284a-7cac-430b-9815-705e1737a072]]", onPress: () => dispatch(Actions.Auth.deleteUser()) },
		]);
    }

	return (
		<LayoutWrapper>
			<View style={styles.outer}>
				<Molecules.Users.Info {...auth} />
				<View style={styles.inner}>
					<View>
						<TouchableOpacity style={styles.item} onPress={handleLogOut}>
							<Atoms.Text.Para style={styles.itemText}>
								[[translation:65accc94-b1d8-4899-85e7-4cc048d70759]]
							</Atoms.Text.Para>
						</TouchableOpacity>
						<TouchableOpacity style={styles.item} onPress={handleDeleteAccount}>
							<Atoms.Text.Para style={styles.dangerItemText}>
								[[translation:f369db68-01bc-4bc1-8baa-773d3ab052ea]]
							</Atoms.Text.Para>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.item} onPress={handleGoBack}>
						<Atoms.Text.Para>[[translation:78d06c58-3368-44ef-b0b6-135f6a9f4936]]</Atoms.Text.Para>
					</TouchableOpacity>
				</View>
			</View>
		</LayoutWrapper>
	);
};

export default Settings;