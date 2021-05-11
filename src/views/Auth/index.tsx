import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/auth";
import { Organisms } from "../../components";
import { User } from "../../declerations";
import * as forms from "./forms";
import styles from "./styles";

const Auth = () => {
	const [hashAccount, setHasAccount] = useState(true);
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
	}, [hashAccount]);

	const text = hashAccount
		? { title: "Velkomin/n aftur!", switchButton: "Mig vantar aðgang" }
		: { title: "Búa til nýjan aðgang", switchButton: "Ég er með aðgang" };

	const handleAuth = (user: User) => dispatch(registerUser(user));

	return isLoading ? (
		<View style={styles.loadingWrap}>
			<ActivityIndicator size={40} />
		</View>
	) : (
		<React.Fragment>
			<Text>{text.title}</Text>
			<View style={styles.form}>
				{hashAccount ? (
					<Organisms.Forms.Builder<User>
						buttonLabel="Skrá inn"
						form={forms.Authenticate}
						url="/api/auth/authenticate"
						HTTPmethod="post"
						onSubmit={handleAuth}
					/>
				) : (
					<Organisms.Forms.Builder<User>
						buttonLabel="Búa til aðgang"
						form={forms.Register}
						url="/api/auth/register"
						HTTPmethod="post"
						onSubmit={handleAuth}
					/>
				)}
			</View>
			<View style={styles.changeForm}>
				<TouchableOpacity onPress={() => setHasAccount((v) => !v)}>
					<Text>{text.switchButton}</Text>
				</TouchableOpacity>
			</View>
		</React.Fragment>
	);
};

export default Auth;
