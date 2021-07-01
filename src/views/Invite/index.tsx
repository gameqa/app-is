import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
	TouchableOpacity,
	Clipboard,
	Alert,
	View,
	Share,
	Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms, Molecules } from "../../components";
import LayoutWrapper from "../../layout";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import * as Analytics from "expo-firebase-analytics";
import * as Actions from "../../actions";

export default function index() {
	const [hasCopied, setHasCopied] = useState(false);
	const [isGiveAway, setIsGiveAway] = useState(false);

	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(Actions.GiveAway.fetchGiveAways());
	}, [dispatch]);

	const giveAway = useSelector((state: StoreState) => state.giveAway);

	const url = `https://spurningar.is/`;

	const alertCopy = () =>
		Alert.alert("Afritað", "Afritun á hlekk tókst", [
			{
				text: "OK",
				onPress: () => null,
			},
		]);

	const handleShare = () =>
		Share.share(
			{
				message:
					"Spurningaleikur þar sem þú getur unnið alvöru vinninga og stutt við íslensku í nútímanum",
				url: url,
				title: "Spurningar.is",
			},
			{
				// Android only:
				dialogTitle: "Spurningar.is",
			}
		);

	const handleCopy = () => {
		Clipboard?.setString(url);
		alertCopy();
		setHasCopied(true);

		Analytics.logEvent("copy_invite", {
			link: url,
		});
	};

	//constant for link to Spurningar.is facebook site
	const PRIZE_GIVEAWAY_SITE = "https://www.facebook.com/spurningar.is";

	//open Spurningar.is facebook page if countdown is pressed
	const loadInBrowser = () => {
		Linking.openURL(PRIZE_GIVEAWAY_SITE).catch((err) =>
			console.error("Couldn't load page", err)
		);
	};

	const showGiveAwayAndReset = () => {
		setIsGiveAway(true);
		setTimeout(setIsGiveAway, 300000, false);
	};

	const getNextGiveAwayTime = () => {
		let today = new Date();
		let closest = new Date("2035-07-07T17:00:00.000Z");
		var closestTime = closest.getTime();
		for (let i = 0; i < giveAway.giveAways.length; i++) {
			let curr = new Date(giveAway.giveAways[i].time);
			let currTime = curr.getTime();

			if (currTime < closestTime && currTime > today.getTime()) {
				closestTime = currTime;
				// closest = curr;
			}
		}
		const presentTime = today.getTime();
		let diffInMilliSeconds = closestTime - presentTime;
		return diffInMilliSeconds / 1000;
	};

	const TIME_UNTIL_GIVEAWAY = getNextGiveAwayTime();

	return (
		<LayoutWrapper>
			<Molecules.Users.Info {...auth} />
			<Atoms.Text.Para style={styles.paragraph}>
				Smelltu á deila, eða afritaðu hlekkinn til þess að bjóða
				vinum að sækja appið.👫🤝
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
					Deila
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
			<Molecules.GiveAway.CountDownComponent
				time={TIME_UNTIL_GIVEAWAY}
				isCounting={!isGiveAway}
				onFinish={showGiveAwayAndReset}
				onPress={loadInBrowser}
				isLoading={giveAway.isLoading}
			/>
		</LayoutWrapper>
	);
}
