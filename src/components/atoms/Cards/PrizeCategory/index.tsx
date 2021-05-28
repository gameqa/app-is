import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Atoms } from "../../..";
import { PrizeCategory } from "../../../../declerations";
import { StoreState } from "../../../../reducers";
import { Prizes, Colors } from "../../../../services";
import styles from "./styles";

const PrizeCategoryCard = (category: PrizeCategory) => {
	const navigation = useNavigation();
	const handleGoToItemsView = () =>
		navigation.navigate("prize-items", category);

	return (
		<TouchableOpacity onPress={handleGoToItemsView}>
			<Atoms.Cards.Base>
				<View style={styles.outer}>
					<View style={styles.topLine}>
						<Atoms.Text.Heading>
							{category.name}
						</Atoms.Text.Heading>
						{category.isAvailable ? (
							<FontAwesome
								name="check"
								size={15}
								color={Colors.MapToDark.success}
							/>
						) : (
							<FontAwesome
								name="lock"
								size={15}
								color={Colors.MapToDark.danger}
							/>
						)}
					</View>
					{category.isAvailable ? (
						<Atoms.Text.Para>
							Þú ert komin/n í pottinn.
						</Atoms.Text.Para>
					) : (
						<Atoms.Text.Para>
							Þú þarft að {category.prereqDescription}.
						</Atoms.Text.Para>
					)}
					<Atoms.Text.Para>
						{category.prizes.length} vinningar í þessum flokki
					</Atoms.Text.Para>
				</View>
			</Atoms.Cards.Base>
		</TouchableOpacity>
	);
};

export default PrizeCategoryCard;
