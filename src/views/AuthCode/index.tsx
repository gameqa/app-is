import React, { useCallback, useRef, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Keyboard } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Actions from "../../actions";
import { Colors } from "../../services";
import { Atoms } from "../../components";
import { FontAwesome } from "@expo/vector-icons";
import * as utils from "./utils";

const AuthCode = () => {
	const state = useSelector((state: StoreState) => state.authCode);
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const handleUserInput = (val: string) =>
		dispatch(Actions.AuthCode.writeAuthCode(val));

	const handleLogOut = () => dispatch(Actions.Auth.logOutUser());

	const handleNewVerificationCode = () =>
		dispatch(Actions.AuthCode.requestNewVerificationCode());

	const handleSendVerificationCode = useCallback(
		(code: string) => dispatch(Actions.AuthCode.verifyUser(code)),
		[]
	);

	const clearError = useCallback(() => dispatch(Actions.AuthCode.clearError()), []);

	const inputRef = useRef(null);

	useEffect(() => {
		// @ts-ignore
		inputRef?.current?.shake();
		clearError();
	}, [inputRef, state.errorMessage, clearError]);

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={styles.outer}>
				<View style={styles.topBox}>
					<Text style={styles.title}>Staðfestingarkóði</Text>
					<Atoms.Text.Para style={styles.para}>
						Staðfestingakóði hefur verið sendur á netfangið {auth.email}
					</Atoms.Text.Para>
				</View>
				{/* Do not remove empty view, its for flex box styling */}
				<View></View>
				<View style={styles.middle}>
					<TouchableOpacity
						style={[styles.touchable, styles.refreshLine]}
						onPress={handleNewVerificationCode}
					>
						<View style={styles.refreshIcon}>
							<FontAwesome
								name="refresh"
								size={14}
								color={Colors.MapToDark["light-grey"]}
							/>
						</View>
						<Text style={styles.greyText}>Senda aftur</Text>
					</TouchableOpacity>
					<SmoothPinCodeInput
						ref={inputRef}
						value={state.code}
						onTextChange={handleUserInput}
						cellStyle={styles.cellStyle}
						cellStyleFocused={styles.cellStyleFocused}
						codeLength={utils.CODE_LENGTH}
						textStyle={[styles.greyText, styles.digits]}
						onFulfill={handleSendVerificationCode}
					/>
				</View>
				<TouchableOpacity style={styles.touchable} onPress={handleLogOut}>
					<Atoms.Text.Para style={styles.greyText}>Útskrá</Atoms.Text.Para>
				</TouchableOpacity>

				<Atoms.Loaders.CenterBox isLoading={state.isLoading} />
			</SafeAreaView>
		</TouchableOpacity>
	);
};

export default AuthCode;
