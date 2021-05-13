import React from "react";
import { View } from "react-native";
import { Atoms } from "../../..";
import { Prizes } from "../../../../services";
import styles from "./styles";

const PrizeCategoryCard = (item: Prizes.PrizeItem) => {
	return (
		<Atoms.Cards.Base style={styles.outer}>
			<View>test</View>
		</Atoms.Cards.Base>
	);
};

export default PrizeCategoryCard;
