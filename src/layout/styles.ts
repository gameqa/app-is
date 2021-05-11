import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	outer: {
		flex: 1,
		width: "100%",
		position: "relative",
	},
	content: {
		flex: 1,
		width: "100%",
		padding: 10,
	},
	centerChildren: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
