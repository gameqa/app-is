import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import { Forms } from "../../components/organisms";


const ResetPasswordAuth = () => {

    const CODE_LENGTH = 8;


	const text = {
		title: "Staðfestingarkóði",
		// description: `Staðfestingarkóði hefur verið sendur á ${}`,
		goBackText: "Til baka'",
	}

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}
		>
		{/* <Forms.PinCodeScreen  
			codeLength={CODE_LENGTH}
			// onGoBack={}
			// onRequestNew={}
			// onSubmit={}
			{...text}
								/>	 */}
		</TouchableOpacity>
    );
};

export default ResetPasswordAuth;
