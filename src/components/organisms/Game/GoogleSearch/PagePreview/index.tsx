import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { IProps } from "./interface";

const PagePreview = (props: IProps) => {
	return (
		<View style={styles.outer}>
			<View style={styles.topLine}>
				<View style={styles.pageIcon}>
					<Image
						style={styles.icon}
						source={{
							uri: props.source.logo,
						}}
					/>
				</View>
				<Text style={styles.url}>{props.source.hostname}</Text>
			</View>
			<Text style={styles.title}>{props.title}</Text>
			<Text style={styles.extract}>{props.snippet}</Text>
		</View>
	);
};

export default PagePreview;
