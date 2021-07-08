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
	unSeenAnswerContainer: {
		flex: 3,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		height: "100%",
		width: "100%",
	},
	unSeenAnswerline: {
		borderBottomWidth: 1,
		borderColor: "#dadada",
		width: "33%",
		height: "33%",
	},
	unSeenTextContainer: {
		width: "33%",
		height: "33%",
	},
	unSeenText: {
		textAlign: "center",
		paddingHorizontal: 10,
		paddingBottom: 20,

		width: "100%",
		height: "100%",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#dadada",
		overflow: "hidden",
		// backgroundColor: "red",
	},
});

export default styles;
