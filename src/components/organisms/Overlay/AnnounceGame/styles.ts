import { StyleSheet } from "react-native";
import { Colors } from "../../../../services";

export const styles = StyleSheet.create({
	outer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: Colors.MapToDark.danger,
	},
	image: {
		width: "95%",
		height: 400,
	},
});
