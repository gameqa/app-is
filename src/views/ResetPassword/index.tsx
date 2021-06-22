import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";
import { registerUser } from "../../actions/auth";
import { Atoms, Organisms } from "../../components";
import { User } from "../../declerations";
import LayoutWrapper from "../../layout";
import * as forms from "./forms";

import * as Alerts from "../../components/atoms/Alerts";
import styles from "./styles";


const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
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
		title: "Fá nýtt lykilorð",
		switchButton: "Ég er með aðgang",
	};

	const handleAuth = (user: User) => {
		dispatch(registerUser(user));
		// Analytics.logEvent("register");
		// dispatch()
		console.log("handleAUth reset pass");
		setIsSubmitted(true);

	};

	return isLoading ? (
		<View >
			<Atoms.Loaders.CenterBox isLoading />
		</View>
	) : (
		<ScrollView>
			<LayoutWrapper>
				<View>
					{/* {isSubmitted ? (
						<Alerts.Ribbon item={{
							type: "success",
							label: "Ef Notendaaðgangur er skráð á þetta email þá færðu sendan link í tölvupósti til þess að fá nýtt lykilorð",
						}} />
					): null} */}
					
					{/* <Atoms.Alerts.Ribbon item={errorMessage} /> */}
					<Organisms.Forms.Builder<User>
						buttonLabel="Fá nýtt lykilorð"
						form={forms.ResetPassword}
						url="/api/auth/reset-password"
						HTTPmethod="post"
						onSubmit={handleAuth}
						buttonColor="highlight"
					></Organisms.Forms.Builder>
				</View>
				<View style={styles.outer}>
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

export default ResetPassword;
