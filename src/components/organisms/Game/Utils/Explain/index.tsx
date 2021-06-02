import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Atoms } from "../../../..";
import { Colors } from "../../../../../services";
import { IProps } from "./interface";
import styles from "./styles";

const Explain = ({ children }: IProps) => {
	return (
		<View style={styles.outer}>
			<Atoms.Text.Para>
				<FontAwesome
					name="info"
					color={Colors.MapToDark.warning}
					size={20}
				/>
				{
					// do not remove spacing before children
					// it serves as padding

					`   ${children}`
				}
			</Atoms.Text.Para>
		</View>
	);
};

export default Explain;
