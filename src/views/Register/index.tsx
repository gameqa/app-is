import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/auth";
import { Atoms, Organisms } from "../../components";
import { User } from "../../declerations";
import LayoutWrapper from "../../layout";
import * as forms from "./forms";
import styles from "./styles";

const Register = () => {
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

	const text = { title: "Búa til nýjan aðgang", switchButton: "Ég er með aðgang" };

	const handleAuth = (user: User) => dispatch(registerUser(user));

	return isLoading ? (
		<View style={styles.loadingWrap}>
			<ActivityIndicator size={40} />
		</View>
	) : (
		<LayoutWrapper>
			<Atoms.Text.Heading>{text.title}</Atoms.Text.Heading>
			<View style={styles.form}>
				(
				<Organisms.Forms.Builder<User>
					buttonLabel="Búa til aðgang"
					form={forms.Register}
					url="/api/auth/register"
					HTTPmethod="post"
					onSubmit={handleAuth}
				/>
			</View>
			<View style={styles.changeForm}>
				<TouchableOpacity onPress={() => null}>
					<Atoms.Text.Para>{text.switchButton}</Atoms.Text.Para>
				</TouchableOpacity>
			</View>
		</LayoutWrapper>
	);
};

export default Register;
