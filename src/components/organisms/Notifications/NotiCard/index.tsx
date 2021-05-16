import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Atoms } from "../../..";
import { Colors } from "../../../../services";
import { HookSignedNotification } from "../interface";
import styles from "./styles";
import * as Actions from "../../../../actions";
import * as utils from "./utils";

const NotiCard = ({ title, description, id, type }: HookSignedNotification) => {
	const dispatch = useDispatch();

	const handleClose = () => dispatch(Actions.Notifications.clearNotificationsById(id));

	return (
		<View style={styles.outer}>
			<View style={styles.left}>
				<FontAwesome
					name={utils.mapToIcon[type].icon}
					size={25}
					color={Colors.MapToDark[utils.mapToIcon[type].color]}
				/>
			</View>
			<View style={styles.right}>
				<View style={styles.top}>
					<Atoms.Text.Heading>{title}</Atoms.Text.Heading>
					<TouchableOpacity style={styles.times} onPress={handleClose}>
						<FontAwesome
							name="times"
							size={15}
							color={Colors.MapToDark["light-grey"]}
						/>
					</TouchableOpacity>
				</View>
				<Atoms.Text.Para>{description}</Atoms.Text.Para>
			</View>
		</View>
	);
};

export default NotiCard;
