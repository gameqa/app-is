import React, { useCallback } from "react";
import { TouchableOpacity, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";

import { Forms } from "../../components/organisms";

const AuthCode = () => {
	const CODE_LENGTH = 6;

	const state = useSelector((state: StoreState) => state.authCode);
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const handleLogOut = () => dispatch(Actions.Auth.logOutUser());

	const handleNewVerificationCode = () =>
		dispatch(Actions.AuthCode.requestNewVerificationCode());

	const handleSendVerificationCode = useCallback(
		(code: string) => dispatch(Actions.AuthCode.verifyUser(code)),
		[]
	);

	const text = {
		title: "[[translation:d6ffe4e3-4a31-44f4-8961-b36d343400c2]]",
		description: `[[translation:99cce31d-82f5-455f-af84-e83ca96b52e7]] ${auth.email}`,
		goBackText: "[[translation:65accc94-b1d8-4899-85e7-4cc048d70759]]",
	};

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}
		>
			<Forms.PinCodeScreen
				codeLength={CODE_LENGTH}
				onGoBack={handleLogOut}
				onRequestNew={handleNewVerificationCode}
				onSubmit={handleSendVerificationCode}
				error={{ label: state.errorMessage, type: "danger" }}
				{...text}
			/>
		</TouchableOpacity>
	);
};

export default AuthCode;
