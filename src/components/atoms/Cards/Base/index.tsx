import React from "react";
import { View } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";

const Base = (props: IProps) => {
	return <View style={styles.outer}>{props.children}</View>;
};

export default Base;
