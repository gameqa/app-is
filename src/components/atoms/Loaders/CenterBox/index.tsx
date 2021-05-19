import React from "react";
import { View, ActivityIndicator } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";

const CenterBoxLoader = ({ isLoading }: IProps) => {
	if (!isLoading) return null;
	return (
		<View style={styles.outer}>
			<View style={styles.inner}>
				<ActivityIndicator />
			</View>
		</View>
	);
};

export default CenterBoxLoader;
