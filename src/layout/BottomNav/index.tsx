import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

const BottomNav = () => {
	return (
		<View style={styles.outer}>
			<FontAwesome size={23} name="tachometer" onPress={() => null} />
			<FontAwesome size={23} name="puzzle-piece" onPress={() => null} />
			<FontAwesome size={23} name="user-plus" onPress={() => null} />
			<FontAwesome size={23} name="trophy" onPress={() => null} />
		</View>
	);
};

export default BottomNav;
