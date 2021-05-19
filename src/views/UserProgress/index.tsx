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
import moment from "moment";

const UserProgress = () => {
	const auth = useSelector((state: StoreState) => state.auth);
	const chartData = useSelector((state: StoreState) => state.chartData);

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
					datasets={[
						{
							data: chartData.answersPerDay.reduce<number[]>((prev, curr) => {
								if (prev.length === 0) return [curr.count];
								const last = prev[prev.length - 1];
								prev.push(curr.count + last);
								return prev;
							}, []),
						},
					]}
					labels={chartData.answersPerDay.map((item, i) => {
						if (i === 0) return moment(item.date).format("DD MM");
						else if (i === chartData.answersPerDay.length - 1) return "í dag      ";
						return "";
					})}
					height={220}
				/>
			</LayoutWrapper>
		</ScrollView>
	);
};

export default UserProgress;
