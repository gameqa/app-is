import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
	},
	fullWidth: {
		width: "100%",
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
	userLevelContainer: {
		justifyContent: "flex-end",
		paddingLeft: 10,
	},
	padTitleTop: {
		paddingTop: 40,
	},
});

export default styles;
