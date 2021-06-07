import { StyleSheet } from "react-native";
import { Colors } from "../../../../services";

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	center: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	buttons: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingTop: 25,
		paddingBottom: 65,
	},
	emojiButton: {
		borderRadius: 45,
		width: 90,
		height: 90,
	},
	emojiButtonThumpsUp: {
		backgroundColor: Colors.MapToDark.success,
	},
	emojiButtonThumpsDown: {
		backgroundColor: Colors.MapToDark.danger,
	},
	emojiText: {
		fontSize: 45,
		position: "absolute",
	},
	emojiTextThumpsUp: {
		top: 12,
		left: 20,
	},
	emojiTextThumpsDown: {
		top: 23,
		left: 21,
	},
	para: {
		textAlign: "center",
		width: 250,
		lineHeight: 20,
		marginBottom: 20,
		fontWeight: "300",
		color: Colors.MapToDark.grey,
	},
	title: {
		marginBottom: 5,
		color: Colors.MapToDark["dark-grey"],
		fontWeight: "400",
	},
});

export default styles;
