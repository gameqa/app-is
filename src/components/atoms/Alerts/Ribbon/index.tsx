import React from "react";
import { View, Text } from "react-native";
import { IProps } from "./interface";

const RibbonAlert = ({ item }: IProps) => {
	if (!item) return null;
	const { label, type } = item;
	return (
		<View>
			<Text>{label}</Text>
		</View>
	);
};

export default RibbonAlert;
