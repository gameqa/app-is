import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
	},
	fullWidth: {
		width: "100%",
	},
	userLevelContainer: {
		justifyContent: "flex-end",
		paddingLeft: 10,
	},
	textOuter: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		marginBottom: 5,
	},
	alignCenter: {
		alignItems: "center",
	},
	nextLevel: {
		marginLeft: 5,
	},
	outer: {
		paddingBottom: 25,
		borderBottomColor: "#e8e8e8",
		borderBottomWidth: 4,
		marginBottom: 25,
	},
});

export default styles;
