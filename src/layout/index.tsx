import React, { useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../reducers";
import * as Actions from "../actions";

const LayoutWrapper = ({ children }: IProps) => {
	const dispatch = useDispatch();
	const auth = useSelector((state: StoreState) => state.auth);

	useEffect(() => {
		dispatch(Actions.Auth.fetchUserFromToken());
		if (!["loading", "guest"].includes(auth.type))
			dispatch(Actions.Game.fetchCurrentGameRound());
	}, [auth._id]);

	const isLoading = auth.type === "loading";

	return isLoading ? (
		<View style={styles.centerChildren}>
			<ActivityIndicator />
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.inner}>{children}</View>
		</SafeAreaView>
	);
};

export default LayoutWrapper;
