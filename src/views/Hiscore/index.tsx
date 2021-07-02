import React, { useEffect } from "react";
import {
	ScrollView,
	ActivityIndicator,
	SafeAreaView,
	NativeScrollEvent,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Atoms, Molecules } from "../../components";
import { useFocusEffect } from "@react-navigation/core";

const Highscore = () => {
	const highscore = useSelector((state: StoreState) => state.highscore);
	const dispatch = useDispatch();

	useFocusEffect(
		React.useCallback(() => {
			dispatch(Actions.Highscore.fetchHighscorePlacement());
		}, [])
	);

	const isCloseToBottom = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		const { layoutMeasurement, contentOffset, contentSize } =
			nativeEvent;
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
		);
	};

	const isCloseToTop = (nativeEvent: NativeScrollEvent) => {
		const { layoutMeasurement, contentOffset, contentSize } =
			nativeEvent;
		return contentOffset.y == 0;
	};

	return (
		<ScrollView
			onScroll={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent)) {
					console.log("scroll a botninn!}!}!}!");
				} else if (isCloseToTop(nativeEvent)) {
					console.log("SCROLL A TOPPINN!");
				}
			}}
			scrollEventThrottle={400}
			style={{ backgroundColor: "white" }}
		>
			<SafeAreaView>
				{highscore.isLoading ? (
					<ActivityIndicator />
				) : (
					highscore.highscores
						.sort(
							(a, b) =>
								a.scoreCard.hiscoreRank -
								b.scoreCard.hiscoreRank
						)
						.map((user) => (
							<Atoms.Cards.HighscoreItem user={user} />
						))
				)}
			</SafeAreaView>
		</ScrollView>
	);
};

export default Highscore;
