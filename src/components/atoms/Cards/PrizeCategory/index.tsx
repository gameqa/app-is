import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Atoms } from "../../..";
import { PrizeCategory } from "../../../../declerations";
import { StoreState } from "../../../../reducers";
import { Colors } from "../../../../services";
import styles from "./styles";

const PrizeCategoryCard = (category: PrizeCategory) => {
	const navigation = useNavigation();
	const handleGoToItemsView = () =>
		navigation.navigate("prize-items", category);

	return (
		<TouchableOpacity onPress={handleGoToItemsView}>
			<Atoms.Cards.Base>
				<View style={styles.outer}>
					<View style={styles.imageOuter}>
						<Image
							style={styles.image}
							source={{
								uri: "https://dunb17ur4ymx4.cloudfront.net/wysiwyg/550688/7d2d3a13aa181518d8ac81fd78b0febeafa8c7e1.png",
							}}
							resizeMode="contain"
						/>
						<View style={styles.icon}>
							{category.isAvailable ? (
								<FontAwesome
									name="check"
									size={50}
									color={Colors.MapToDark.success}
								/>
							) : (
								<FontAwesome
									name="lock"
									size={50}
									color={Colors.MapToDark.danger}
								/>
							)}
						</View>
					</View>
					<Atoms.Text.Heading>
						{category.name}
					</Atoms.Text.Heading>
					<View style={styles.topLine}>
						{category.isAvailable ? (
							<Atoms.Text.Para>
								Þú ert komin/n í pottinn.
							</Atoms.Text.Para>
						) : (
							<Atoms.Text.Para style={styles.para}>
								Þú þarft að {category.prereqDescription}.
							</Atoms.Text.Para>
						)}
					</View>
					<Atoms.Text.Para>
						{category.prizes.length} vinningar í þessum flokki
					</Atoms.Text.Para>
				</View>
			</Atoms.Cards.Base>
		</TouchableOpacity>
	);
};

export default PrizeCategoryCard;
