import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { IProps } from "./interface";
import * as Services from "../../../../services";

const UserAvatar = ({ level }: IProps) => {
	return (
		<Image
			style={styles.outer}
			source={Services.UserLevels.mapLevelToIconURL(level)}
		/>
	);
};

export default UserAvatar;
