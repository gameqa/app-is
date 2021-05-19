import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import { Prizes, Colors } from "../../../../services";
import styles from "./styles";

const PrizeCategoryCard = (category: Prizes.PrizeCategory) => {
	const auth = useSelector((state: StoreState) => state.auth);
	const itemCount = useMemo(
		() => Prizes.PrizeItems.filter((item) => item.category === category.name).length,
		[]
	);

	const isAvailable = Prizes.hasUnlockedCategory(category.name, auth);

	const navigation = useNavigation();

	const handleGoToItemsView = () => navigation.navigate("prize-items", category);

	return (
		<TouchableOpacity onPress={handleGoToItemsView}>
			<Atoms.Cards.Base>
				<View style={styles.outer}>
					<View style={styles.topLine}>
						<Atoms.Text.Heading>{category.name}</Atoms.Text.Heading>
						{isAvailable ? (
							<FontAwesome name="check" size={15} color={Colors.MapToDark.success} />
						) : (
							<FontAwesome name="lock" size={15} color={Colors.MapToDark.danger} />
						)}
					</View>
					{isAvailable ? (
						<Atoms.Text.Para>Þú ert komin/n í pottinn.</Atoms.Text.Para>
					) : (
						<Atoms.Text.Para>Þú þarft að {category.prereqDescription}.</Atoms.Text.Para>
					)}
					<Atoms.Text.Para>{itemCount} vinningar í þessum flokki</Atoms.Text.Para>
				</View>
			</Atoms.Cards.Base>
		</TouchableOpacity>
	);
};

export default PrizeCategoryCard;
