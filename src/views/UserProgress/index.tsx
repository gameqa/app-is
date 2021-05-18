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
import { ScrollView } from "react-native-gesture-handler";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const alertSignOut = () =>
		Alert.alert("Útskráning", "Viltu skrá þig út?", [
			{
				text: "Nei",
				onPress: () => null,
				style: "cancel",
			},
			{ text: "Já", onPress: () => dispatch(logOutUser()) },
		]);

	return (
		<ScrollView>
			<LayoutWrapper>
				<View>
					<Molecules.Users.Info {...auth} />
					<TouchableOpacity onPress={alertSignOut} style={styles.lock}>
						<FontAwesome
							name="lock"
							size={20}
							color={Services.Colors.MapToDark["grey"]}
						/>
					</TouchableOpacity>
				</View>

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
		</ScrollView>
	);
};

export default UserProgress;
