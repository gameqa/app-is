import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		position: "relative",
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
	spaceBetween: {
		justifyContent: "space-between",
	},
	lock: {
		top: 15,
		position: "absolute",
		right: 0,
	},
});

export default styles;
