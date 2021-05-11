import React from "react";
import { View, Text } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";

const InputWrapper = ({ children, label, required }: IProps) => {
	return (
		<View style={styles.outer}>
			<Text>
				{label} {required ? "*" : null}
			</Text>
			{children}
		</View>
	);
};

export default InputWrapper;
