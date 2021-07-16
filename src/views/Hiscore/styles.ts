import { StyleSheet } from "react-native";
import { Colors } from "../../services";

const styles = StyleSheet.create({
	absoluteButton: {
		height: 60,
		width: 60,
		borderRadius: 30,
		backgroundColor: Colors.MapToDark.highlight,
		position: "absolute",
		bottom: 10,
		right: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
