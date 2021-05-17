import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const PagePreview = () => {
	return (
		<View style={styles.outer}>
			<View style={styles.topLine}>
				<View style={styles.pageIcon}>
					<Image
						style={styles.icon}
						source={{
							uri: "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png",
						}}
					/>
				</View>
				<Text style={styles.url}>https://is.m.wikipeda.org</Text>
			</View>
			<Text style={styles.title}>Good Mythical Morning</Text>
			<Text>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
				Ipsum has been the industry's standard dummy text ever since the 1500s book.
			</Text>
		</View>
	);
};

export default PagePreview;
