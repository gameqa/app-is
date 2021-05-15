import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import NotiCard from "./NotiCard";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";

export const Items = () => {
	const state = useSelector((state: StoreState) => state.notification);
	return (
		<View style={styles.outer}>
			<View style={styles.inner}>
				{state.priority ? <NotiCard {...state.priority} /> : null}
				{state.list.map((item) => (
					<NotiCard {...item} />
				))}
			</View>
		</View>
	);
};

export * as Hooks from "./Hooks";
export * from "./interface";
