import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	TouchableOpacity,
	Clipboard,
	Alert,
	View,
	Share,
	ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms, Molecules } from "../../components";
import LayoutWrapper from "../../layout";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import * as Actions from "../../actions";
import * as GlobalConfig from "../../config";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

export default function index() {
	const [hasCopied, setHasCopied] = useState(false);

	const auth = useSelector((state: StoreState) => state.auth);

	const chartData = useSelector((state: StoreState) => state.chartData);

	const dispatch = useDispatch();

	const url = "Https://spurningaris.app.link";

	const alertCopy = () =>
		Alert.alert("[[translation:b0325be3-7704-4cf7-838d-b87e44910121]]", "[[translation:e455478b-c64c-46c9-a5c0-c88446558008]]", [
			{
				text: "OK",
				onPress: () => null,
			},
		]);

	const numbers = React.useMemo(() => {
		const date = new Date();
		const yesterday = date.setDate(date.getDate() - 1);
		const dayBefore = date.setDate(date.getDate() - 2);
		return chartData.answersPerDay.length === 0
				? [
						{
							date: dayBefore,
							count: 0,
						},
						{
							date: yesterday,
							count: 1,
						},
						{
							date: date,
							count: 2,
						},
				  ]
				: chartData.answersPerDay;
	}, []);

	const handleShare = () =>
		Share.share(
			{
				message:
					"[[translation:3aa3fb90-1f9c-4408-9004-b7d2c2624de1]]",
				url: url,
				title: "[[translation:c71ca2d5-22ec-4d4d-85f8-799d2860c62f]]",
			},
			{
				// Android only:
				dialogTitle: "[[translation:c71ca2d5-22ec-4d4d-85f8-799d2860c62f]]",
			}
		);

	const handleCopy = () => {
		Clipboard?.setString(url);
		alertCopy();
		setHasCopied(true);

		// Analytics.logEvent("copy_invite", {
		// 	link: url,
		// });
	};

	useFocusEffect(
		React.useCallback(() => {
			dispatch(Actions.ChartData.fetchAnswersPerDay());
		}, [])
	);

	return (
		<LayoutWrapper>
			<ScrollView>
				<Molecules.Users.Info {...auth} />
				<Atoms.Text.Para style={styles.paragraph}>
				[[translation:6d779c31-0784-4adc-8aa1-b1d115754296]].[[translation:defd268e-7e37-4d39-a898-bfc1d8615169]][[translation:a35858d0-09d8-4ca9-9150-49eb550346db]]
				</Atoms.Text.Para>
				<TouchableOpacity
					onPress={handleCopy}
					style={{
						...styles.linkOuter,
						borderColor: hasCopied
							? Services.Colors.MapToDark.success
							: Services.Colors.MapToDark.highlight,
					}}
				>
					<View
						style={{
							...styles.copyIcon,
							backgroundColor: hasCopied
								? Services.Colors.MapToDark.success
								: Services.Colors.MapToDark.highlight,
						}}
					>
						<FontAwesome
							name="copy"
							size={17}
							color={Services.Colors.MapToDark["light-grey"]}
						/>
					</View>
					<Atoms.Text.Para style={styles.link}>
						{url.slice(0, 35)}...
					</Atoms.Text.Para>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.shareOuter}
					onPress={handleShare}
				>
					<FontAwesome
						name="share"
						size={14}
						color={Services.Colors.MapToDark["light-grey"]}
					/>
					<Atoms.Text.Para style={styles.shareText}>
					[[translation:c71ca2d5-22ec-4d4d-85f8-799d2860c62f]]
					</Atoms.Text.Para>
				</TouchableOpacity>
				<View
					style={{
						marginBottom: 20,
						marginTop: 10,
						borderBottomWidth: 1,
						borderColor: "#ccc",
					}}
				/>
				<Atoms.Text.Heading>
					[[translation:feda1bfa-88a7-45bc-bd13-993a95e36c02]]
				</Atoms.Text.Heading>
				<Atoms.Text.Para>
					[[translation:d434778e-3e21-433b-ab1a-d0ae184d59a5]]
				</Atoms.Text.Para>
				<Atoms.Charts.LineChart
					datasets={[
						{
							// data: [1, 2, 5, 10, 15, 22, 23, 33],
							data: numbers.reduce<number[]>(
								(prev, curr) => {
									if (prev.length === 0)
										return [curr.count + 23000];
									const last = prev[prev.length - 1];
									prev.push(curr.count + last);
									return prev;
								},
								[]
							).map((item) => (item / 1000)),
						},
					]}
					labels={chartData.answersPerDay.map((item, i) => {
						if (i === 0)
							return moment(item.date).format(GlobalConfig.MOMENT_LANG_DATE_FORMAT);
						else if (i === chartData.answersPerDay.length - 1)
							return "[[translation:f61875f1-9689-4062-af19-f58323279e65]]      ";
						return "";
					})}
					height={220}
				/>
			</ScrollView>
		</LayoutWrapper>
	);
}
