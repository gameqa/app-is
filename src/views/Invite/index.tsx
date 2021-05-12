import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, Clipboard, Alert, View } from "react-native";
import { useSelector } from "react-redux";
import { Atoms } from "../../components";
import LayoutWrapper from "../../layout";
import { StoreState } from "../../reducers";
import styles from "./styles";
import * as Services from "../../services";

export default function index() {
	const [hasCopied, setHasCopied] = useState(false);
	const auth = useSelector((state: StoreState) => state.auth);

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
	return (
		<LayoutWrapper>
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
			<Atoms.Text.Para>
				Smelltu á hlekkin til að afrita hann. Þegar notandi skráir sig eftir að smella á
				þinn hlekk þá birtist hér mynd. Þegar þú hefur boðið 10 vinum þá getur þú unnið
				vinninga fyrir að vera áhrifavaldur.
			</Atoms.Text.Para>
			<Atoms.Cards.Cards>
				<View />
			</Atoms.Cards.Cards>
			<Atoms.Cards.Cards>
				<View />
			</Atoms.Cards.Cards>
			<Atoms.Cards.Cards>
				<View />
			</Atoms.Cards.Cards>
		</LayoutWrapper>
	);
}
