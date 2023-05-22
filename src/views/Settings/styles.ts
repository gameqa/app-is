import { StyleSheet } from "react-native";
import { Colors } from "../../services";

const styles = StyleSheet.create({
	outer: {
		position: "relative",
		flex: 1
	},
	inner: {
		flex: 1,
		justifyContent: "space-between",
	},
	item: {
		width: "100%",
		borderBottomColor: Colors.MapToDark['light-grey'],
		borderBottomWidth: 1,
		height: 80,
		justifyContent: "center",
		alignItems: "center"
	},
	fadedItemText: {
		fontWeight: "300"
	},
	itemText: {
		fontWeight: "400"
	},
	dangerItemText: {
		color: Colors.MapToDark["danger"],
		fontWeight: "600"
	}
});

export default styles;