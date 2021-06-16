import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";
import { registerUser } from "../../actions/auth";
import { Atoms, Organisms } from "../../components";
import { User } from "../../declerations";
import LayoutWrapper from "../../layout";
import { ICON_LVL_3, ICON_LVL_7 } from "../../static";
import * as forms from "./forms";


const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);

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
		title: "Búa til nýjan aðgang",
		switchButton: "Ég er með aðgang",
	};

	const handleAuth = (user: User) => {
		dispatch(registerUser(user));
		Analytics.logEvent("register");
	};

	return isLoading ? (
		<View >
			<Atoms.Loaders.CenterBox isLoading />
		</View>
	) : (
		<ScrollView>
			<LayoutWrapper>
				<View>
					<Organisms.Forms.Builder<User>
						buttonLabel="Skrá nýtt lykilorð"
						form={forms.ResetPassword}
						url="/api/auth/register"
						HTTPmethod="post"
						onSubmit={handleAuth}
						buttonColor="highlight"
					></Organisms.Forms.Builder>
				</View>
				<View>
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
