import React from "react";
import { Image, View } from "react-native";
import { Atoms } from "../../..";
import { Prize } from "../../../../declerations";
import styles from "./styles";

const PrizeCategoryCard = ({ name, imageURL }: Prize) => {
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
