import React, { useCallback, useState } from "react";
import { TouchableOpacity, Keyboard, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Forms } from "../../components/organisms";

import * as Actions from "../../actions";
import { StoreState } from "../../reducers";
import { useNavigation } from "@react-navigation/native";

const ResetPasswordAuth = () => {
	const dispatch = useDispatch();

	const state = useSelector((state: StoreState) => state.authCode);
	const resetPass = useSelector(
		(state: StoreState) => state.resetPassword
	);

	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.navigate("reset-password");
	};

	//
	const handleNewVerificationCode = () => {
		dispatch(
			Actions.ResetPassword.getResetPasswordCode(
				resetPass.email ?? ""
			)
		);
	};

	const handleSubmit = (value: string) => {
		dispatch(Actions.ResetPassword.setResetPasswordCode(value));
		dispatch(
			Actions.ResetPassword.getResetPasswordToken(
				resetPass.email ?? "",
				value
			)
		);
		navigation.navigate("set-new-password");
	};

	const CODE_LENGTH = 8;

	const text = {
		title: "[[translation:d6ffe4e3-4a31-44f4-8961-b36d343400c2]]",
		description: `[[translation:2ea52d7f-e7cc-423b-b7d1-6cb238fe4cf6]] ${resetPass.email}`,
		goBackText: "[[translation:78d06c58-3368-44ef-b0b6-135f6a9f4936]]",
	};

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}
		>
			<Forms.PinCodeScreen
				codeLength={CODE_LENGTH}
				onSubmit={(value) => handleSubmit(value)}
				onGoBack={handleGoBack}
				onRequestNew={handleNewVerificationCode}
				error={{
					label: state.errorMessage,
					type: "danger",
				}}
				{...text}
			/>
		</TouchableOpacity>
	);
};

export default ResetPasswordAuth;
