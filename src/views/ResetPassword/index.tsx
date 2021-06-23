import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Atoms, Organisms } from "../../components";
import LayoutWrapper from "../../layout";
import * as forms from "./forms";

import styles from "./styles";
import { StoreState } from "../../reducers";

const ResetPassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const state = useSelector((state: StoreState) => state.resetPassword);

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

	const handleAuth = (email: string) => {};

	return isLoading ? (
		<View>
			<Atoms.Loaders.CenterBox isLoading />
		</View>
	) : (
		<ScrollView>
			<LayoutWrapper>
				<View>
					<Atoms.Text.Heading>
						Gleymt lykilorð
					</Atoms.Text.Heading>
					<Atoms.Text.Para>
						Skráðu inn email til að fá nýtt lykilorði
					</Atoms.Text.Para>
					{/* <Atoms.Inputs.Text
						props={{ keyboardType: "email-address" }}
					/>
					<Atoms.Buttons>{text.title}</Atoms.Buttons> */}
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
