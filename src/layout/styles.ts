import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	outer: {
		width: "100%",
		padding: 10,
		flex: 1,
	},
	inner: { flex: 1, padding: 10 },
	centerChildren: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
