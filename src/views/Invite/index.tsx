import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, Clipboard, Alert, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Atoms, Molecules } from "../../components";
import LayoutWrapper from "../../layout";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";
import { fetchInvites } from "../../actions/auth";

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
				style: "cancel",
			},
		]);

	const handleCopy = () => {
		Clipboard?.setString(url);
		alertCopy();
		setHasCopied(true);
	};

	useEffect(() => {
		dispatch(fetchInvites());
	}, []);

	const invites = auth.invites.filter((invite) => invite.type !== "not-verified");
	return (
		<LayoutWrapper>
			<Molecules.Users.Info {...auth} />
			<Atoms.Text.Para style={styles.paragraph}>
				Smelltu á hlekkin til að afrita hann. Þegar notandi skráir sig eftir að smella á
				þinn hlekk þá birtist hér mynd. Þegar þú hefur boðið 10 vinum þá getur þú unnið
				vinninga fyrir að vera áhrifavaldur.
			</Atoms.Text.Para>
			<TouchableOpacity
				onPress={handleCopy}
				style={{
					...styles.linkOuter,
					borderColor: hasCopied
						? Services.Colors.MapToDark.success
						: Services.Colors.MapToDark["grey"],
				}}
			>
				<FontAwesome
					name="copy"
					size={17}
					color={
						hasCopied
							? Services.Colors.MapToDark.success
							: Services.Colors.MapToDark["grey"]
					}
				/>
				<Atoms.Text.Para style={styles.link}>{url.slice(0, 35)}...</Atoms.Text.Para>
			</TouchableOpacity>
			{invites.length === 0 ? (
				<Atoms.Alerts.Ribbon
					item={{ label: "Það hefur enginn skráð sig enn", type: "warning" }}
				/>
			) : (
				invites.map((invite) => <Atoms.Cards.User {...invite} />)
			)}
		</LayoutWrapper>
	);
}
