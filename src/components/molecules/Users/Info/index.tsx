import React from "react";
import { View } from "react-native";
import { Atoms } from "../../..";
import { User } from "../../../../declerations";
import * as Services from "../../../../services";
import styles from "./styles";

const UsersInfo = (user: User) => {
	return (
		<View style={styles.row}>
			<Atoms.Users.Avatar {...user} />
			<View style={[styles.fullWidth, styles.userLevelContainer]}>
				<Atoms.Text.Heading>{user.username}</Atoms.Text.Heading>
				<Atoms.Text.Para>
					Lvl {user.level} {Services.UserLevels.mapLevelToString(user.level)}
				</Atoms.Text.Para>
				<Atoms.Text.Para>#{user.scoreCard.hiscoreRank} á stigatöflunni</Atoms.Text.Para>
			</View>
		</View>
	);
};

export default UsersInfo;
