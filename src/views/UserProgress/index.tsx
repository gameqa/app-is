import React from "react";
import { View, Text, Dimensions } from "react-native";
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
					<Text>{auth.username}</Text>
					<Text>
						Lvl {auth.level} {Services.UserLevels.mapLevelToString(auth.level)}
					</Text>
					<Text>
						<Text> #{auth.scoreCard.hiscoreRank} á stigatöflunni</Text>
					</Text>
				</View>
			</View>
			<View style={styles.textOuter}>
				<Text>4/10 að Lvl {auth.level + 1}</Text>
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
					<Text style={styles.nextLevel}>
						{Services.UserLevels.mapLevelToString(auth.level + 1)}
					</Text>
				</View>
			</View>
			<Atoms.Charts.ProgressBar ratio={0.4} label="bla" color="success" />

			<Text>Þú hefur búið til</Text>
			<Organisms.Users.ScoreCard {...auth} />
			<Atoms.Charts.LineChart
				datasets={[{ data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4] }]}
				labels={["a", "", "", "b"]}
				height={220}
			/>
		</View>
	);
};

export default UserProgress;
