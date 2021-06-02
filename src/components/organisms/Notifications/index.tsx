import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import styles from "./styles";
import NotiCard from "./NotiCard";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";

export const Items = () => {
	const state = useSelector((state: StoreState) => state.notification);
	return (
		<SafeAreaView style={styles.outer}>
			{state.priority ? <NotiCard {...state.priority} /> : null}
			{state.list.map((item) => (
				<NotiCard {...item} />
			))}
		</SafeAreaView>
	);
};

export * as Hooks from "./Hooks";
export * from "./interface";
