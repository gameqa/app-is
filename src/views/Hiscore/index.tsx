import React, { useEffect, useState } from "react";
import { NativeScrollEvent, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Atoms } from "../../components";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import { User } from "../../declerations";

const Highscore = () => {
	const highscore = useSelector((state: StoreState) => state.highscore);
	const dispatch = useDispatch();

	useFocusEffect(
		React.useCallback(() => {
			console.log("wtf");
			dispatch(Actions.Highscore.fetchHighscorePlacement());
		}, [])
	);

	// const isCloseToBottom = (nativeEvent: NativeScrollEvent) => {
	// 	const paddingToBottom = 15;
	// 	const { layoutMeasurement, contentOffset, contentSize } =
	// 		nativeEvent;
	// 	return (
	// 		layoutMeasurement.height + contentOffset.y >=
	// 		contentSize.height - paddingToBottom
	// 	);
	// };

	// const isCloseToTop = (nativeEvent: NativeScrollEvent) => {
	// 	const { layoutMeasurement, contentOffset, contentSize } =
	// 		nativeEvent;
	// 	return contentOffset.y == 0;
	// };

	const DEFAULT_LIMIT = 10;

	const getLastOffset = () => {
		console.log(
			highscore.highscores[highscore.highscores.length - 1]
				?.scoreCard.hiscoreRank
		);
		return (
			highscore.highscores[highscore.highscores.length - 1]
				?.scoreCard.hiscoreRank + 1
		);
	};

	const getFirstOffset = () => {
		return (
			highscore.highscores[0]?.scoreCard.hiscoreRank - DEFAULT_LIMIT
		);
	};

	return (
		<FlatList
			refreshControl={
				<RefreshControl
					refreshing={false}
					onRefresh={() => {
						dispatch(
							Actions.Highscore.fetchHighscorePlacementExpansionUp(
								getFirstOffset() - 5,
								DEFAULT_LIMIT
							)
						);
					}}
				/>
			}
			data={highscore.highscores}
			keyExtractor={(item: User) => item._id}
			onEndReached={() =>
				dispatch(
					Actions.Highscore.fetchHighscorePlacementExpansionDown(
						getLastOffset(),
						DEFAULT_LIMIT
					)
				)
			}
			onEndReachedThreshold={0}
			renderItem={(result: { item: User }) => (
				<Atoms.Cards.HighscoreItem
					user={result.item}
					key={result.item._id}
				/>
			)}
		/>
	);
};

export default Highscore;

// highscore.highscores
// .sort(
// 	(a, b) =>
// 		a.scoreCard.hiscoreRank -
// 		b.scoreCard.hiscoreRank
// )
// .map((user) => (
// 	<Atoms.Cards.HighscoreItem user={user} />
// ))

{
	/* <ScrollView
			onScroll={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent)) {
					console.log("scroll a botninn!}!}!}!");
					dispatch(
						Actions.Highscore.fetchHighscorePlacementExpansion(
							getLastOffset(),
							DEFAULT_LIMIT
						)
					);
				} else if (isCloseToTop(nativeEvent)) {
					console.log("SCROLL A TOPPINN!");

					dispatch(
						Actions.Highscore.fetchHighscorePlacementExpansion(
							getFirstOffset() - 5,
							DEFAULT_LIMIT
						)
					);
				}
			}}
			scrollEventThrottle={0}
			style={{ backgroundColor: "white" }}
		></ScrollView> */
}
