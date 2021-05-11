import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { IProps } from "./interface";

const BaseButton = (props: IProps) => {
	const { label } = props;
	return (
		<TouchableOpacity {...props}>
			<Text>{label}</Text>
		</TouchableOpacity>
	);
};

export default BaseButton;
