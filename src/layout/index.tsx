import React, { useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
import { IProps } from "./interface";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../reducers";
import { fetchUserFromToken } from "../actions/auth";
import * as Views from "../views";

const LayoutWrapper = ({ children }: IProps) => {
	const dispatch = useDispatch();
	const auth = useSelector((state: StoreState) => state.auth);

	useEffect(() => {
		dispatch(fetchUserFromToken());
	}, [auth.type]);

	const isAuth = !["loading", "guest"].includes(auth.type);
	const isLoading = auth.type === "loading";

	return isLoading ? (
		<View style={styles.centerChildren}>
			<ActivityIndicator />
		</View>
	) : isAuth ? (
		<SafeAreaView style={styles.outer}>
			<ScrollView style={styles.content}>{children}</ScrollView>
		</SafeAreaView>
	) : (
		<SafeAreaView style={styles.content}>
			<View style={styles.content}>
				<Views.Auth />
			</View>
		</SafeAreaView>
	);
};

export default LayoutWrapper;
