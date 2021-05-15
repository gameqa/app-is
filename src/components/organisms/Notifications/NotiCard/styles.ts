import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	outer: {
		backgroundColor: "white",
		borderRadius: 4,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.12,
		shadowRadius: 3.22,
		elevation: 3,
		padding: 10,
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
	times: {
		paddingLeft: 10,
		paddingBottom: 10,
	},
});

export default styles;
