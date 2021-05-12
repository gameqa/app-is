import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { Atoms, Organisms } from "../../components";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { FontAwesome } from "@expo/vector-icons";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	return (
		<View>
			<View style={styles.row}>
				<Atoms.Users.Avatar {...auth} />
				<View style={[styles.fullWidth, styles.userLevelContainer]}>
					<Atoms.Text.Heading>{auth.username}</Atoms.Text.Heading>
					<Atoms.Text.Para>
						Lvl {auth.level} {Services.UserLevels.mapLevelToString(auth.level)}
					</Atoms.Text.Para>
					<Atoms.Text.Para>
						#{auth.scoreCard.hiscoreRank} á stigatöflunni
					</Atoms.Text.Para>
				</View>
			</View>
			<View style={styles.textOuter}>
				<Atoms.Text.Para>40% að Lvl {auth.level + 1}</Atoms.Text.Para>
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
						{Services.UserLevels.mapLevelToString(auth.level + 1)}
					</Atoms.Text.Para>
				</View>
			</View>
			<Atoms.Charts.ProgressBar ratio={0.4} label="bla" color="success" />

			<Atoms.Text.Heading style={styles.padTitleTop}>Minn árangur</Atoms.Text.Heading>
			<Organisms.Users.ScoreCard {...auth} />
			<Atoms.Text.Heading style={styles.padTitleTop}>
				Leiðin að 100 þúsund
			</Atoms.Text.Heading>
			<Atoms.Charts.LineChart
				datasets={[{ data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4] }]}
				labels={["a", "", "", "b"]}
				height={220}
			/>
		</View>
	);
};

export default UserProgress;
