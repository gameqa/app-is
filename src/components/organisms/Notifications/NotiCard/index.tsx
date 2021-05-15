import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Atoms } from "../../..";
import { Colors } from "../../../../services";
import { HookSignedNotification } from "../interface";
import styles from "./styles";
import * as Actions from "../../../../actions";

const NotiCard = ({ title, description, id }: HookSignedNotification) => {
	const dispatch = useDispatch();

	const handleClose = () => dispatch(Actions.Notifications.clearNotificationsById(id));

	return (
		<View style={styles.outer}>
			<View style={styles.top}>
				<Atoms.Text.Heading>{title}</Atoms.Text.Heading>
				<TouchableOpacity style={styles.times} onPress={handleClose}>
					<FontAwesome name="times" size={15} color={Colors.MapToDark["light-grey"]} />
				</TouchableOpacity>
			</View>
			<Atoms.Text.Para>{description}</Atoms.Text.Para>
		</View>
	);
};

export default NotiCard;
