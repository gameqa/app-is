import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
	TouchableOpacity,
	Clipboard,
	Alert,
	View,
	Share,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms, Molecules } from "../../components";
import LayoutWrapper from "../../layout";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { fetchInvites } from "../../actions/auth";
import * as Analytics from "expo-firebase-analytics";

export default function index() {
	const [hasCopied, setHasCopied] = useState(false);
	const auth = useSelector((state: StoreState) => state.auth);
	const dispatch = useDispatch();

	const url = `https://spurningar.is/bjoda/${auth._id}`;

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

	useEffect(() => {
		dispatch(fetchInvites());
	}, []);

	const invites = auth.invites.filter(
		(invite) => invite.type !== "not-verified"
	);
	return (
		<LayoutWrapper>
			<Molecules.Users.Info {...auth} />
			<Atoms.Text.Para style={styles.paragraph}>
				Smelltu á deila, eða afritaðu hlekkinn til þess að bjóða
				vinum að sækja appið. Þegar notandi samþykkir boðið þá 
				birtist nafnið hans hér. Þegar þú hefur
				boðið 10 vinum þá getur þú unnið vinninga fyrir að vera
				áhrifavaldur.
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
			<Atoms.Text.Heading style={{ marginBottom: 10 }}>
				Samþykkt boð
			</Atoms.Text.Heading>
			{invites.length === 0 ? (
				<Atoms.Alerts.Ribbon
					item={{
						label: "Þú hefur ekki boðið neinum ennþá",
						type: "warning",
					}}
				/>
			) : (
				invites.map((invite) => <Atoms.Cards.User {...invite} />)
			)}
		</LayoutWrapper>
	);
}
