import React, { useEffect, useCallback } from "react";
import { Image, Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import LayoutWrapper from "../../layout";
import { IProps } from "./interface";
import { NavigateBack } from "../utils";
import { Atoms } from "../../components";
import { Utils } from "../../components/organisms/Game";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";

const ArticleReaderView = ({
	route: { params: article },
	navigation: { goBack },
}: IProps) => {
	const state = useSelector((state: StoreState) => state.articleReader);
	const game = useSelector((state: StoreState) => state.game);
	const googleSearch = useSelector((state: StoreState) => state.googleSearch);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			Actions.ArticleReader.previewArticleToSubmit(
				article.source.identifier,
				article.articleKey
			)
		);
	}, [article._id]);

	const handleSubmitParagraph = useCallback(
		(paragraphIndex: number) => {
			Alert.alert("Ertu viss?", "Inniheldur þessi efnsgrein svarið við spurningunni?", [
				{
					text: "Nei",
					onPress: () => null,
				},
				{
					text: "Já",
					onPress: () => {
						dispatch(
							Actions.Game.submitArticleAndParagraph(
								game._id, // game round id
								article.source.identifier,
								article.articleKey,
								googleSearch._id, // questionId
								paragraphIndex
							)
						);
						goBack();
					},
				},
			]);
		},
		[
			game._id,
			game.currentRound,
			article.source.identifier,
			article.articleKey,
			googleSearch._id,
		]
	);

	return (
		<ScrollView>
			<LayoutWrapper>
				<NavigateBack goBackHandler={goBack} />
				<Utils.QuestionIs question={googleSearch.text} />
				<Atoms.Text.Para style={styles.para}>
					Við sóttum textann sem fylgir vefsíðunni. Lestu yfir textann og athugaðu hvort
					þú sjáir svarið við spurningunni. Smelltu á efnisgreinina sem inniheldur
					svarið.
				</Atoms.Text.Para>
				<View style={styles.topLine}>
					<Image source={{ uri: article.source.logo }} style={styles.logo} />
					<Text>{article.title}</Text>
				</View>

				{state.error ? (
					<Atoms.Alerts.Ribbon
						item={{ type: "danger", label: "Ekki tókst að sækja grein" }}
					/>
				) : (
					state.paragraphs.map((text, i) => (
						<TouchableOpacity onPress={() => handleSubmitParagraph(i)}>
							<Atoms.Text.Para style={styles.textParagraph}>{text}</Atoms.Text.Para>
						</TouchableOpacity>
					))
				)}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default ArticleReaderView;
