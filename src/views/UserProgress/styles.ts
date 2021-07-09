import { StyleSheet } from "react-native";
import { AuthCode } from "../../actions";
import * as Services from "../../services";

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
	scrollContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	selectViewButton: {
		height: 80,
		width: 130,
		borderRadius: 7,
		backgroundColor: Services.Colors.MapToLight.highlight,
		marginRight: 20,
		justifyContent: "center",
		padding: 10,
	},
	buttonLabel: {
		fontSize: 14,
		fontWeight: "500",
		marginTop: 5,
		color: Services.Colors.MapToDark.highlight,
		margin: 0,
		textAlign: "center",
	},
	answerCount: {
		fontSize: 28,
		fontWeight: "500",
		color: Services.Colors.MapToDark.highlight,
		margin: 0,
		textAlign: "center",
	},
	topLeftCorner: {
		position: "absolute",
		left: 5,
		top: 5,
	},
	bottomLeftCorner: {
		position: "absolute",
		left: 5,
		bottom: 5,
	},
	bottomRightCorner: {
		position: "absolute",
		right: 5,
		top: 5,
	},
	topRightCorner: {
		position: "absolute",
		right: 5,
		bottom: 5,
	},
});

export default styles;
