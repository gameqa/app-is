import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Atoms } from "../../../components";
import * as Services from "../../../services";
import { IProps } from "./interface";
import styles from "./styles";

const NavigateBack = (props: IProps) => {
	return (
		<TouchableOpacity style={styles.backButton} onPress={props.goBackHandler}>
			<FontAwesome
				name="arrow-left"
				size={15}
				color={Services.Colors.MapToDark["grey"]}
			/>
			<Atoms.Text.Para style={styles.backText}>[[translation:78d06c58-3368-44ef-b0b6-135f6a9f4936]]</Atoms.Text.Para>
		</TouchableOpacity>
	);
};

export default NavigateBack;
