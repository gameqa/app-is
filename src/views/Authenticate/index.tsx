import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/auth";
import { Atoms, Organisms } from "../../components";
import { User } from "../../declerations";
import LayoutWrapper from "../../layout";
import * as forms from "./forms";
import styles from "./styles";

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

	const text = { title: "Velkomin/n aftur!", switchButton: "Mig vantar aðgang" };

	const handleAuth = (user: User) => dispatch(registerUser(user));

	return isLoading ? (
		<View style={styles.loadingWrap}>
			<ActivityIndicator size={40} />
		</View>
	) : (
		<LayoutWrapper>
			<Atoms.Text.Heading>{text.title}</Atoms.Text.Heading>
			<View style={styles.form}>
				<Organisms.Forms.Builder<User>
					buttonLabel="Skrá inn"
					form={forms.Authenticate}
					url="/api/auth/authenticate"
					HTTPmethod="post"
					onSubmit={handleAuth}
				/>
			</View>
			<View style={styles.changeForm}>
				<TouchableOpacity onPress={() => null}>
					<Text>{text.switchButton}</Text>
				</TouchableOpacity>
			</View>
		</LayoutWrapper>
	);
};

export default Authenticate;
