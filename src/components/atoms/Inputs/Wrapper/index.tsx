import React from "react";
import { View, Text } from "react-native";
import { IProps } from "./interface";

const InputWrapper = ({ children, label, required }: IProps) => {
	return (
		<View>
			<Text>
				{label} <View>{required ? "*" : null}</View>
			</Text>
			{children}
		</View>
	);
};

export default InputWrapper;
