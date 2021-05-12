import React from "react";
import { Text } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";

const Heading = (props: IProps) => {
	return <Text style={styles.text}>{props.children}</Text>;
};

export default Heading;
