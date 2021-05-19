import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../reducers";
import { Atoms } from "../components";

const LayoutWrapper = ({ children }: IProps) => {
	const dispatch = useDispatch();
	const auth = useSelector((state: StoreState) => state.auth);

	const isLoading = auth.type === "loading";

	return isLoading ? (
		<View style={styles.centerChildren}>
			<Atoms.Loaders.CenterBox isLoading />
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.inner}>{children}</View>
		</SafeAreaView>
	);
};

export default LayoutWrapper;
