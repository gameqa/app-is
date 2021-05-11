import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { Atoms } from "../../components";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	return (
		<View>
			<View style={styles.row}>
				<Atoms.Users.Avatar {...auth} />
				<View style={styles.fullWidth}>
					<Text>{auth.username}</Text>
					<Text>
						Lvl {auth.level} {Services.UserLevels.mapLevelToString(auth.level)}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default UserProgress;
