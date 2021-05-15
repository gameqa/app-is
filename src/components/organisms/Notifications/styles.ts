import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	outer: {
		position: "relative",
		zIndex: 10,
		height: 0,
		width: "95%",
		marginLeft: "2.5%",
		top: 50,
	},
	inner: {
		position: "absolute",
		flexDirection: "column-reverse",
		width: "100%",
	},
});

export default style;
