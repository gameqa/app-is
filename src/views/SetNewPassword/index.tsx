import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { Atoms } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../actions";
import { StoreState } from "../../reducers";
import LayoutWrapper from "../../layout";

import styles from "./styles";

const SetNewPassword = () => {
	const [pass, setPass] = useState("");
	const dispatch = useDispatch();

	const resetPass = useSelector(
		(state: StoreState) => state.resetPassword
	);

	const submitPasswordChange = useCallback(
		() =>
			dispatch(
				Actions.ResetPassword.resetPasswordWithToken(
					resetPass.email ?? "",
					pass,
					resetPass.resetToken ?? ""
				)
			),
		[pass]
	);

	const text = {
		labelOne: "[[translation:3f6b302c-b013-4a7b-9f0c-057d1536fb18]]",
		labelTwo: "[[translation:f9afe8c8-ea5e-495b-a96c-0e1ab5007d44]]",
		placeholder: "[[translation:de0f29ad-e669-4cc8-94f5-13f37d3a6680]]",
		btnLabel: "[[translation:63d51e1b-3367-4529-9849-925856fdaff1]]",
	};

	return (
		<View style={styles.outer}>
			<LayoutWrapper>
				<Atoms.Alerts.Ribbon item={resetPass.errorAlert} />
				<Atoms.Text.Para>{text.labelOne}</Atoms.Text.Para>
				<Atoms.Inputs.Password
					placeholder={text.placeholder}
					value={pass}
					onChange={(value) => setPass(value)}
				/>
				<Atoms.Buttons.Base
					type={"highlight"}
					label={text.btnLabel}
					onPress={submitPasswordChange}
				/>
			</LayoutWrapper>
		</View>
	);
};

export default SetNewPassword;
