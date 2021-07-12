import React from "react";
import { RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { Atoms } from "../../components";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import { User } from "../../declerations";

const FETCH_MORE_AT_SCROLL_POSITION = 0.6;

const Highscore = () => {
	const highscore = useSelector((state: StoreState) => state.highscore);
	const dispatch = useDispatch();

	useFocusEffect(
		React.useCallback(() => {
			dispatch(Actions.Highscore.fetchHighscorePlacement());
		}, [])
	);

	const DEFAULT_LIMIT = 10;

	const getLastOffset = () => {
		return (
			highscore.highscores[highscore.highscores.length - 1]
				?.scoreCard.hiscoreRank + 1
		);
	};

	const getFirstOffset = () => {
		return Math.max(
			1,
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
								getFirstOffset(),
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
			onEndReachedThreshold={FETCH_MORE_AT_SCROLL_POSITION}
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
