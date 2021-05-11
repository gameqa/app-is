import React from "react";
import { TextInput } from "react-native";
import { TextInputProps } from "../../../../declerations";

const CustomTextInput = (props: TextInputProps) => (
	<TextInput {...props} onChangeText={props.onChange} />
);

export default CustomTextInput;
