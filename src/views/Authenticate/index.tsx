import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/auth";
import { Atoms, Organisms } from "../../components";
import { User } from "../../declerations";
import LayoutWrapper from "../../layout";
import * as forms from "./forms";
import styles from "./styles";
import * as Services from "../../services";
import { ICON_LVL_1, ICON_LVL_5 } from "../../static";
import * as Analytics from "expo-firebase-analytics";

const Authenticate = () => {
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
		title: "[[translation:b529825f-fa0a-417c-8432-d30a7b56f35c]]!",
		switchButton: "[[translation:cdba63bc-8764-4360-8f6d-d17b6da0b769]]",
	};

	const handleAuth = (user: User) => {
		dispatch(registerUser(user));

		Analytics.logEvent("login");
	};

	return isLoading ? (
		<View style={styles.loadingWrap}>
			<Atoms.Loaders.CenterBox isLoading />
		</View>
	) : (
		<LayoutWrapper>
			<View style={styles.form}>
				<Organisms.Forms.Builder<User>
					buttonLabel="[[translation:b5f212d7-7751-4abf-af59-7e8553b26cd8]]"
					form={forms.Authenticate}
					url="/api/auth/authenticate"
					HTTPmethod="post"
					onSubmit={handleAuth}
					buttonColor="highlight"
				>
				<View style={styles.changeForm}>
					<TouchableOpacity onPress={() => navigation.navigate("reset-password")}>
						<Atoms.Text.Para>[[translation:6b1a9363-c272-40f5-90bf-700797df6550]]</Atoms.Text.Para>
					</TouchableOpacity>
				</View>
					<View style={{ flex: 1 }}>
						<View style={styles.imageWrapper}>
							<View style={styles.leftIconView}>
								<Image
									style={styles.leftIcon}
									source={ICON_LVL_1}
								/>
							</View>

							<View style={styles.rightIconView}>
								<Image
									style={styles.rightIcon}
									source={ICON_LVL_5}
								/>
							</View>
						</View>
					</View>
				</Organisms.Forms.Builder>
			</View>
			<View style={styles.changeForm}>
				<TouchableOpacity
					onPress={() => navigation.navigate("sign-up")}
				>
					<Atoms.Text.Para>{text.switchButton}</Atoms.Text.Para>
				</TouchableOpacity>
			</View>
		</LayoutWrapper>
	);
};

export default Authenticate;
