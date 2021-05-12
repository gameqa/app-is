import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { IProps } from "./interface";
import * as Services from "../../../../services";

const UserAvatar = ({ level, color }: IProps) => {
	return (
		<Image
			style={{
				...styles.outer,
				borderColor: Services.Colors.MapToDark[color ?? "light-grey"],
			}}
			source={Services.UserLevels.mapLevelToIconURL(level)}
		/>
	);
};

export default UserAvatar;
