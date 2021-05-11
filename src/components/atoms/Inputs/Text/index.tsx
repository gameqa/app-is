import React from "react";
import { TextInput } from "react-native";
import { TextInputProps } from "../../../../declerations";
import InputStyles from "../styles";

const CustomTextInput = (props: TextInputProps) => (
	<TextInput
		style={InputStyles.outer}
		{...props}
		onChangeText={props.onChange}
	/>
);

export default CustomTextInput;
