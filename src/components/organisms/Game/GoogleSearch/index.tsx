import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../../";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import PagePreview from "./PagePreview";
import styles from "./styles";

const GoogleSearch = () => {
	const state = useSelector((state: StoreState) => state.googleSearch);
	const game = useSelector((state: StoreState) => state.game);
	const dispatch = useDispatch();

	const handleMarkImposible = useCallback(() => {
		Alert.alert(
			"[[translation:43ad9161-97e6-4bac-9b90-1e08e5537118]]",
			"[[translation:c3b2e703-6e25-40da-b3d3-c7d2ae4f42fc]]",
			[
				{
					text: "[[translation:b1e80198-9c0f-433b-b352-0a7d84dbc635]]",
					onPress: () => null,
				},
				{
					text: "[[translation:17b6284a-7cac-430b-9815-705e1737a072]]",
					onPress: () =>
						dispatch(
							Actions.Game.markQuestionAsImpossible(
								game._id,
								state._id
							)
						),
				},
			]
		);
	}, []);

	return (
		<ScrollView>
			<Utils.QuestionIs question={state.text} />
			<Utils.Explain>
			[[translation:6eb6fc05-e841-4511-ab4e-735c5be89476]] 📚🔬📰
			</Utils.Explain>
			<Atoms.Inputs.Google
				onChange={(val) =>
					dispatch(Actions.GoogleSearch.writeGoogleQuery(val))
				}
				value={state.query}
				onSubmit={() =>
					dispatch(Actions.GoogleSearch.fetchArticlesQuery())
				}
			/>

			{state.articles.length > 0 ? (
				<React.Fragment>
					<Atoms.Text.Para>
					[[translation:2732e272-cd47-4bc5-8ff6-3c48d3f5e32b]]
					</Atoms.Text.Para>
				</React.Fragment>
			) : null}
			<TouchableOpacity
				style={styles.cantFindOuter}
				onPress={handleMarkImposible}
			>
				<Atoms.Text.Para>[[translation:36a2969e-55ce-4c22-9832-d3e292df97dc]] [[translation:e65b7ce4-027f-4a5f-a821-333a71d1804b]]</Atoms.Text.Para>
			</TouchableOpacity>
			<View style={styles.ribbon}>
				{state.searchError ? (
					<Atoms.Alerts.Ribbon
						item={{
							type: "danger",
							label: "[[translation:61735474-90bf-4d3f-aa14-e02a20469934]]",
						}}
					/>
				) : state.noResults ? (
					<Atoms.Alerts.Ribbon
						item={{
							type: "warning",
							label: "[[translation:e64d9651-83b0-4444-b5b2-5fb2a1428624]]",
						}}
					/>
				) : null}
			</View>
			{state.articles.map((item) => (
				// articleKey as key is reserved in react
				<PagePreview {...item} articleKey={item.key} />
			))}
		</ScrollView>
	);
};

export default GoogleSearch;
