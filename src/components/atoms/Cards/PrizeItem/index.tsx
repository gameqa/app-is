import React from "react";
import { Image, View } from "react-native";
import { Atoms } from "../../..";
import { Prizes } from "../../../../services";
import styles from "./styles";

const PrizeCategoryCard = ({ name, imageURL }: Prizes.PrizeItem) => {
	return (
		<Atoms.Cards.Base style={styles.outer}>
			<Image source={{ uri: imageURL }} style={styles.image} />
			<View style={styles.pad}>
				<Atoms.Text.Heading>{name}</Atoms.Text.Heading>
			</View>
		</Atoms.Cards.Base>
	);
};

export default PrizeCategoryCard;
