import React, { useMemo } from "react";
import { IProps } from "./interface";
import * as Services from "../../services";
import LayoutWrapper from "../../layout";
import { Atoms } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { Utils } from "../";

const PrizeItems = ({
	route: { params: category },
	navigation: { goBack },
}: IProps) => {
	const items = useMemo(
		() => Services.Prizes.PrizeItems.filter((item) => item.category === category.name),
		[]
	);
	return (
		<ScrollView>
			<LayoutWrapper>
				<Utils.NavigateBack goBackHandler={goBack} />
				{items.map((item) => (
					<Atoms.Cards.PrizeItem {...item} />
				))}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default PrizeItems;
