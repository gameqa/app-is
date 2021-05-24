import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/auth";
import { Atoms, Organisms } from "../../components";
import { User } from "../../declerations";
import LayoutWrapper from "../../layout";
import { ICON_LVL_3, ICON_LVL_7 } from "../../static";
import * as forms from "./forms";
import * as Services from "../../services";
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

	const navigation = useNavigation<any>();
	const text = { title: "Búa til nýjan aðgang", switchButton: "Ég er með aðgang" };

	const handleAuth = (user: User) => dispatch(registerUser(user));

	return isLoading ? (
		<View style={styles.loadingWrap}>
			<Atoms.Loaders.CenterBox isLoading />
		</View>
	) : (
		<ScrollView>
			<LayoutWrapper>
				<View style={styles.form}>
					<Organisms.Forms.Builder<User>
						buttonLabel="Búa til aðgang"
						form={forms.Register}
						url="/api/auth/register"
						HTTPmethod="post"
						onSubmit={handleAuth}
						buttonColor="highlight"
					>
						<View style={styles.imageWrapper}>
							<View style={styles.leftIconView}>
								<Image style={styles.leftIcon} source={ICON_LVL_3} />
							</View>

							<View style={styles.rightIconView}>
								<Image style={styles.rightIcon} source={ICON_LVL_7} />
							</View>
						</View>
					</Organisms.Forms.Builder>
				</View>
				<View style={styles.changeForm}>
					<TouchableOpacity onPress={() => navigation.navigate("log-in")}>
						<Atoms.Text.Para>{text.switchButton}</Atoms.Text.Para>
					</TouchableOpacity>
				</View>
			</LayoutWrapper>
		</ScrollView>
	);
};

export default Register;
