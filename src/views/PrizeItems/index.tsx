import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { IProps } from "./interface";
import * as Services from "../../services";
import LayoutWrapper from "../../layout";
import { Atoms } from "../../components";

const PrizeItems = ({ route: { params: category } }: IProps) => {
	const items = useMemo(
		() => Services.Prizes.PrizeItems.filter((item) => item.category === category.name),
		[]
	);
	return (
		<LayoutWrapper>
			{items.map((item) => (
				<Atoms.Cards.PrizeItem {...item} />
			))}
		</LayoutWrapper>
	);
};

export default PrizeItems;
