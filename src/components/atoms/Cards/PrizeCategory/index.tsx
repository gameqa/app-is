import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Atoms } from "../../..";
import { PrizeCategory } from "../../../../declerations";
import styles from "./styles";

const PrizeCategoryCard = (category: PrizeCategory) => {
	const navigation = useNavigation();
	const handleGoToItemsView = () =>
		navigation.navigate("prize-items", category);

	// console.log("PrizeCategoryCArd",category)

	return (
		<TouchableOpacity onPress={handleGoToItemsView}>
			<Atoms.Cards.Base>
				<View style={styles.outer}>
					<View style={styles.imageOuter}>
						<Image
							style={styles.image}
							source={{
								uri: category.isAvailable
									? category.unlockedImg
									: category.lockedImg,
							}}
							resizeMode="contain"
						/>
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
