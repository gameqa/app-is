import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { IProps } from "./interface";
import * as Services from "../../../../services";
import styles from "./styles";

const BaseButton = (props: IProps) => {
	const { label, type } = props;

	return (
		<TouchableOpacity
			{...props}
			style={{
				backgroundColor: Services.Colors.MapToDark[type],
				...styles.outer,
			}}
		>
			<Text style={{ color: Services.Colors.MapToLight[type] }}>{label}</Text>
		</TouchableOpacity>
	);
};

export default BaseButton;
