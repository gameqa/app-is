import React from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Atoms, Molecules, Organisms } from "../../components";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { FontAwesome } from "@expo/vector-icons";
import LayoutWrapper from "../../layout";
import { logOutUser } from "../../actions/auth";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const alertSignOut = () =>
		Alert.alert("Útskráning", "Viltu skrá þig út?", [
			{
				text: "Nei",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{ text: "Já", onPress: () => dispatch(logOutUser()) },
		]);

	return (
		<LayoutWrapper>
			<View style={[styles.topRow]}>
				<Molecules.Users.Info {...auth} />
				<TouchableOpacity onPress={alertSignOut} style={styles.lock}>
					<FontAwesome
						name="lock"
						size={20}
						color={Services.Colors.MapToDark["grey"]}
					/>
				</TouchableOpacity>
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
		</LayoutWrapper>
	);
};

export default UserProgress;
