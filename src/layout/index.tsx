import React from "react";
import { View } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";
import BottomNav from "./BottomNav";

const LayoutWrapper = ({ children }: IProps) => {
	return (
		<View style={styles.outer}>
			<View style={styles.content}>{children}</View>
			<BottomNav />
		</View>
	);
};

export default LayoutWrapper;
