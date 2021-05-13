import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { IProps } from "./interface";
import * as Services from "../../services";
import LayoutWrapper from "../../layout";
import { Atoms } from "../../components";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

const PrizeItems = ({
	route: { params: category },
	navigation: { goBack },
}: IProps) => {
	const items = useMemo(
		() => Services.Prizes.PrizeItems.filter((item) => item.category === category.name),
		[]
	);
	return (
		<LayoutWrapper>
			<TouchableOpacity style={styles.backButton} onPress={goBack}>
				<FontAwesome
					name="arrow-left"
					size={15}
					color={Services.Colors.MapToDark["grey"]}
				/>
				<Atoms.Text.Para style={styles.backText}>Til Baka</Atoms.Text.Para>
			</TouchableOpacity>
			{items.map((item) => (
				<Atoms.Cards.PrizeItem {...item} />
			))}
		</LayoutWrapper>
	);
};

export default PrizeItems;
