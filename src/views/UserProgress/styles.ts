import { StyleSheet } from "react-native";
import { AuthCode } from "../../actions";

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
	},
	padTitleTop: {
		paddingTop: 40,
	},
	spaceBetween: {
		justifyContent: "space-between",
	},
	lock: {
		top: 0,
		position: "absolute",
		right: 0,
		padding: 15,
	},
	unSeenLine: {
		backgroundColor: "green",
	},
});

export default styles;
