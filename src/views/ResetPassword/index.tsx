import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Atoms } from "../../components";
import * as Actions from "../../actions";
import LayoutWrapper from "../../layout";

import styles from "./styles";
import { StoreState } from "../../reducers";

const ResetPassword = () => {
	const state = useSelector((state: StoreState) => state.resetPassword);

	const dispatch = useDispatch();

	const navigation = useNavigation<any>();

	const text = {
		title: "[[translation:a131ec39-c67f-49be-82c2-d3081d72e020]]",
		switchButton: "[[translation:c24cdc16-0a15-4c6c-b042-9da5e5a06142]]",
		btnColor: "highlight",
	};

	const handleSubmit = useCallback(() => {
		dispatch(
			Actions.ResetPassword.getResetPasswordCode(state.email ?? "")
		);
		navigation.navigate("reset-password-authcode");
	}, [state.email]);

	return (
		<ScrollView>
			<LayoutWrapper>
				<View>
					<Atoms.Text.Heading>
					[[translation:37697751-2f22-4df1-b942-00ed6e525a4e]]
					</Atoms.Text.Heading>
					<Atoms.Text.Para>
					[[translation:59475d93-9003-41f0-8f3b-64bb0847cb0a]]
					</Atoms.Text.Para>

					<Atoms.Inputs.Text
						value={state.email ?? ""}
						placeholder="[[translation:106400a5-1f09-4bea-9459-0c5704fa8450]]"
						onChange={(value) =>
							dispatch(
								Actions.ResetPassword.setResetPasswordEmail(
									value
								)
							)
						}
						props={{
							keyboardType: "email-address",
						}}
					/>
					<Atoms.Buttons.Base
						type={"highlight"}
						label={state.isLoading ? "[[translation:40f55f23-1d45-46dc-ae39-02a61e4d6594]]" : text.title}
						onPress={handleSubmit}
					/>
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
