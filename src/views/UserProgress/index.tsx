import React from "react";
import { View, Text, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { Atoms, Organisms } from "../../components";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { FontAwesome } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

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
			<View style={styles.row}>
				<FontAwesome
					size={30}
					name="sort-numeric-desc"
					color={Services.Colors.MapToDark["highlight"]}
				/>
				<Text>Númer #{auth.scoreCard.hiscoreRank} á stigatöflunni</Text>
			</View>
			<Text>
				Samfélagið á spurningar.is er stanslaust að búa til spurningar og finna svör.
				Því fleiri spurningar og svör sem þú skapar því betra sæti nærð þú á
				stigatöflunni
			</Text>
			<Text>Þú hefur búið til</Text>
			<Organisms.Users.ScoreCard {...auth} />
			<LineChart
				data={{
					labels: ["January", "", "", "", "", "June"],
					datasets: [
						{
							data: [
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
							],
						},
					],
				}}
				width={Dimensions.get("window").width} // from react-native
				height={220}
				chartConfig={{
					backgroundColor: "#e26a00",
					backgroundGradientFrom: "#fb8c00",
					backgroundGradientTo: "#ffa726",
					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
					},
				}}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
			/>
		</View>
	);
};

export default UserProgress;
