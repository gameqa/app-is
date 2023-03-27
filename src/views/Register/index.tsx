import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";
import { registerUser } from "../../actions/auth";
import { Atoms, Organisms } from "../../components";
import { User } from "../../declerations";
import LayoutWrapper from "../../layout";
import * as forms from "./forms";
import styles from "./styles";
import * as Hooks from "../../hooks";
import { StoreState } from "../../reducers";

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [referral] = Hooks.DeepLinks.useDeepLinking("referral");

	const dispatch = useDispatch();

	useEffect(() => {
		const LOADING_TIMEOUT = 500;
		setIsLoading(true);
		const t = setTimeout(() => {
			setIsLoading(false);
		}, LOADING_TIMEOUT);
		return () => {
			clearTimeout(t);
		};
	}, []);

	const navigation = useNavigation<any>();
	const text = {
		title: "[[translation:0af7678c-3379-41f2-8839-5c2aaa0f9131]]",
		switchButton: "[[translation:bfaf4b4a-1fa8-414a-ba11-4d753bdd20bd]]",
	};

	const handleAuth = (user: User) => {
		dispatch(
			registerUser({
				...referral,
				...user,
			})
		);
		Analytics.logEvent("register");
	};

	return isLoading ? (
		<View style={styles.loadingWrap}>
			<Atoms.Loaders.CenterBox isLoading />
		</View>
	) : (
		<ScrollView>
			<LayoutWrapper>
				<View style={styles.form}>
					<Organisms.Forms.Builder<User>
						buttonLabel="[[translation:bbc46ed8-6b61-4909-949f-af938119d579]]"
						form={forms.Register}
						url="/api/auth/register"
						HTTPmethod="post"
						onSubmit={handleAuth}
						buttonColor="highlight"
					></Organisms.Forms.Builder>
				</View>
				<View style={styles.changeForm}>
					<TouchableOpacity
						onPress={() => navigation.navigate("log-in")}
					>
						<Atoms.Text.Para>
							{text.switchButton}
						</Atoms.Text.Para>
					</TouchableOpacity>
				</View>
			</LayoutWrapper>
		</ScrollView>
	);
};

export default Register;
