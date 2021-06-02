import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	outer: {
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	inner: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.08,
		shadowRadius: 4.22,
		elevation: 3,
		alignItems: "center",
		padding: 15,
	},
	chestContainer: {
		width: "100%",
		aspectRatio: 1.3,
		alignItems: "center",
		paddingTop: 20,
	},
});

export default style;
