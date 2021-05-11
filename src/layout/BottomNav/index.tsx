import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

const BottomNav = () => {
	return (
		<View style={styles.outer}>
			<FontAwesome
				size={23}
				name="tachometer"
				onPress={() => null}
				color="#999"
			/>
			<FontAwesome
				size={23}
				name="puzzle-piece"
				onPress={() => null}
				color="#999"
			/>
			<FontAwesome
				size={23}
				name="user-plus"
				onPress={() => null}
				color="#999"
			/>
			<FontAwesome size={23} name="trophy" onPress={() => null} color="#aaa" />
		</View>
	);
};

export default BottomNav;
