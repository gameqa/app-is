import { FontAwesome } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { View, Image } from "react-native";
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

	return (
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
					<Atoms.Text.Para>Þú hefur aflæst {category.name_tf}</Atoms.Text.Para>
				) : (
					<Atoms.Text.Para>Þú þarft að {category.prereqDescription}</Atoms.Text.Para>
				)}
				<Atoms.Text.Para>{itemCount} vinningar í þessum flokki</Atoms.Text.Para>
			</View>
		</Atoms.Cards.Base>
	);
};

export default PrizeCategoryCard;
