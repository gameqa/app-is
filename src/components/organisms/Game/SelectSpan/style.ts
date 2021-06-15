import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	outer: {
		flex: 1,
	},
	bottomWrapper: {
		justifyContent: "space-between",
		alignItems: "center",
		borderTopColor: "#ccc",
		borderTopWidth: 1,
	},
	bottomHeading: {
		paddingVertical: 10,
	},
	bottomButtonWrapper: {
		flexDirection: "row",
		width: 175,
		justifyContent: "space-between",
	},
});
