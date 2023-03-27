import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../services";
import { IProps } from "./interface";
import styles from "./styles";

const CenterBoxLoader = ({ isLoading, onCancel }: IProps) => {
	if (!isLoading) return null;
	return (
		<View style={styles.outer}>
			{onCancel !== undefined ? (
				<TouchableOpacity onPress={onCancel} style={styles.cancel}>
					<Text style={styles.cancelText}>
					[[translation:8a6e3047-e77f-4c85-b713-2e93e2c26d6a]] [[translation:3b44ed43-0d08-4095-b9ec-f442f545b73a]]
					</Text>
				</TouchableOpacity>
			) : null}
			<View style={styles.inner}>
				<ActivityIndicator color={Colors.MapToDark.highlight} />
			</View>
		</View>
	);
};

export default CenterBoxLoader;
