import React from "react";
import { Image, Text } from "react-native";
import { Atoms } from "../../..";
import { Prizes } from "../../../../services";
import styles from "./styles";

const PrizeCategoryCard = ({ name, imageURL }: Prizes.PrizeItem) => {
	return (
		<Atoms.Cards.Base style={styles.outer}>
			<Image source={{ uri: imageURL }} style={styles.image} />
		</Atoms.Cards.Base>
	);
};

export default PrizeCategoryCard;
