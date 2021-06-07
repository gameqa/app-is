import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../../";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import PagePreview from "./PagePreview";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../../services";

const GoogleSearch = () => {
	const state = useSelector((state: StoreState) => state.googleSearch);
	const game = useSelector((state: StoreState) => state.game);
	const dispatch = useDispatch();

	const handleMarkImposible = useCallback(() => {
		Alert.alert(
			"Ertu viss?",
			"Það gerist af og til að ekkert svar finnst.",
			[
				{
					text: "Nei",
					onPress: () => null,
				},
				{
					text: "Já",
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
				Hér getur þú notað Google til að finna svarið á íslensku
				Wikipediu, Vísindavefnum, vísir.is og mbl.is 📚🔬📰
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
						Þú getur opnað síðurnar sem þér þykir líklegar. Þú
						þarft þar að velja efnisgreinina sem inniheldur
						svarið.
					</Atoms.Text.Para>
				</React.Fragment>
			) : null}
			<TouchableOpacity
				style={styles.cantFindOuter}
				onPress={handleMarkImposible}
			>
				<Atoms.Text.Para>😩 Ég finn ekki svarið</Atoms.Text.Para>
			</TouchableOpacity>
			<View style={styles.ribbon}>
				{state.searchError ? (
					<Atoms.Alerts.Ribbon
						item={{
							type: "danger",
							label: "Villa við leit, prófaðu annan leitarstreng",
						}}
					/>
				) : state.noResults ? (
					<Atoms.Alerts.Ribbon
						item={{
							type: "warning",
							label: "Ekkert fannst, prófaðu annan leitarstreng",
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
