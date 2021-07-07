import React, { useEffect, useState } from "react";
import {
	ScrollView,
	ActivityIndicator,
	SafeAreaView,
	NativeScrollEvent,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Atoms } from "../../components";
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
		const paddingToBottom = 0;
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

	const DEFAULT_LIMIT = 10;

	const getLastOffset = () => {
		return (
			highscore.highscores[highscore.highscores.length - 1]
				?.scoreCard.hiscoreRank + DEFAULT_LIMIT ?? undefined
		);
	};

	const getFirstOffset = () => {
		return (
			highscore.highscores[0]?.scoreCard.hiscoreRank -
				DEFAULT_LIMIT ?? undefined
		);
	};

	return (
		<ScrollView
			onScroll={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent)) {
					console.log("scroll a botninn!}!}!}!");
					dispatch(
						Actions.Highscore.fetchHighscorePlacement(
							getLastOffset(),
							DEFAULT_LIMIT
						)
					);
				} else if (isCloseToTop(nativeEvent)) {
					console.log("SCROLL A TOPPINN!");

					dispatch(
						Actions.Highscore.fetchHighscorePlacement(
							getFirstOffset() - 5,
							DEFAULT_LIMIT
						)
					);
					// console.log(highscore.highscores);
				}
			}}
			scrollEventThrottle={700}
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
