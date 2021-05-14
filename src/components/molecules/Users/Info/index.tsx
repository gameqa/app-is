import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Atoms } from "../../..";
import { User } from "../../../../declerations";
import * as Services from "../../../../services";
import styles from "./styles";

const UsersInfo = (user: User) => {
	return (
		<View style={styles.outer}>
			{/* The avatar and level info */}
			<View style={styles.row}>
				<Atoms.Users.Avatar {...user} />
				<View style={[styles.fullWidth, styles.userLevelContainer]}>
					<Atoms.Text.Heading>{user.username}</Atoms.Text.Heading>
					<Atoms.Text.Para>
						Lvl {user.level} {Services.UserLevels.mapLevelToString(user.level)}
					</Atoms.Text.Para>
					<Atoms.Text.Para>
						#{user.scoreCard.hiscoreRank} á stigatöflunni
					</Atoms.Text.Para>
				</View>
			</View>
			{/* Level progress info */}
			<View style={styles.textOuter}>
				<Atoms.Text.Para>40% að Lvl {user.level + 1}</Atoms.Text.Para>
				<View style={[styles.row, styles.alignCenter]}>
					<FontAwesome
						size={12}
						name="chevron-right"
						color={Services.Colors.MapToDark["warning"]}
					/>
					<FontAwesome
						size={12}
						name="chevron-right"
						color={Services.Colors.MapToDark["warning"]}
					/>
					<Atoms.Text.Para style={styles.nextLevel}>
						{Services.UserLevels.mapLevelToString(user.level + 1)}
					</Atoms.Text.Para>
				</View>
			</View>
			<Atoms.Charts.ProgressBar ratio={0.4} label="bla" color="success" />
		</View>
	);
};

export default UsersInfo;
