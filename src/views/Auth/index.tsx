import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Organisms } from "../../components";
import { User } from "../../declerations";
import * as forms from "./forms";
import styles from "./styles";

const Auth = () => {
	const [hashAccount, setHasAccount] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const LOADING_TIMEOUT = 500;
		setIsLoading(true);
		const t = setTimeout(() => {
			setIsLoading(false);
		}, LOADING_TIMEOUT);
		return () => {
			clearTimeout(t);
		};
	}, [hashAccount]);

	return isLoading ? (
		<View style={styles.loadingWrap}>
			<ActivityIndicator size={40} />
		</View>
	) : (
		<View style={styles.form}>
			{hashAccount ? (
				<Organisms.Forms.Builder<User>
					buttonLabel="Skrá inn"
					form={forms.Authenticate}
					url="/api/auth/register"
					HTTPmethod="post"
					onSubmit={() => null}
				/>
			) : (
				<Organisms.Forms.Builder<User>
					buttonLabel="Búa til adðgang"
					form={forms.Register}
					url="/api/auth/authenticate"
					HTTPmethod="post"
					onSubmit={() => null}
				/>
			)}
			<TouchableOpacity onPress={() => setHasAccount((v) => !v)}>
				<Text>Skipta</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Auth;
