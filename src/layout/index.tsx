import React, { useEffect } from "react";
import {
	View,
	SafeAreaView,
	ActivityIndicator,
	ScrollView,
	Dimensions,
} from "react-native";
import { IProps } from "./interface";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../reducers";
import { fetchUserFromToken } from "../actions/auth";

const LayoutWrapper = ({ children }: IProps) => {
	const dispatch = useDispatch();
	const auth = useSelector((state: StoreState) => state.auth);

	useEffect(() => {
		dispatch(fetchUserFromToken());
	}, [auth.type]);

	const isLoading = auth.type === "loading";

	return isLoading ? (
		<View style={styles.centerChildren}>
			<ActivityIndicator />
		</View>
	) : (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.inner}>
				<View style={{ position: "relative", zIndex: 10, height: 0 }}>
					<View
						style={{
							position: "absolute",
							width: "100%",
							height: 40,
							backgroundColor: "white",
							borderRadius: 4,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 0,
							},
							shadowOpacity: 0.12,
							shadowRadius: 3.22,
							elevation: 3,
						}}
					></View>
				</View>
				{children}
			</View>
		</SafeAreaView>
	);
};

export default LayoutWrapper;
