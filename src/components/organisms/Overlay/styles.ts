import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	outer: {
		height: Dimensions.get("screen").height,
		width: Dimensions.get("screen").width,
		position: "absolute",
		top: 0,
		left: 0,
	},
});

export default styles;
