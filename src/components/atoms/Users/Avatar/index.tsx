import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { IProps } from "./interface";
import * as Services from "../../../../services";

const UserAvatar = ({ level, color, size: sizeProp }: IProps) => {
	const DEFAULT_SIZE = 70;
	const size = sizeProp === undefined ? DEFAULT_SIZE : sizeProp;
	const borderRadius = size / 2;
	return (
		<Image
			style={{
				...styles.outer,
				borderColor:
					Services.Colors.MapToDark[color ?? "light-grey"],
				height: size,
				width: size,
				borderRadius,
			}}
			source={Services.UserLevels.mapLevelToIconURL(level)}
		/>
	);
};

export default UserAvatar;
