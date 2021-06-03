import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { IProps } from "./interface";
import * as Services from "../../../../services";
import styles from "./styles";

const BaseButton = (props: IProps) => {
	const { label, type, inactive } = props;

	const cb = inactive ? undefined : props.onPress;
	return (
		<TouchableOpacity
			{...props}
			style={{
				backgroundColor: Services.Colors.MapToDark[type],
				...styles.outer,
				opacity: inactive ? 0.15 : 1,
			}}
			activeOpacity={0.15}
			onPress={cb}
		>
			<Text style={{ color: Services.Colors.MapToLight[type] }}>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default BaseButton;
