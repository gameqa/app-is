import React, { useEffect, useCallback } from "react";
import {
	ActivityIndicator,
	Image,
	Text,
	View,
	TouchableOpacity,
	Alert,
} from "react-native";
import LayoutWrapper from "../../layout";
import { IProps } from "./interface";
import { NavigateBack } from "../utils";
import { Atoms } from "../../components";
import { Utils } from "../../components/organisms/Game";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../reducers";
import * as Actions from "../../actions";
import { ScrollView } from "react-native-gesture-handler";

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

	const handleSubmitParagraph = useCallback(() => {
		Alert.alert("Ertu viss", "Inniheldur þessi efnsgrein svarið við spurningunni?", [
			{
				text: "Nei",
				onPress: () => null,
			},
			{
				text: "Já",
				onPress: () => null,
			},
		]);
		// dispatch(
		// 	Actions.Game.submitArticleAndParagraph(
		// 		game._id,
		// 		article.source.identifier,
		// 		article.articleKey,
		// 	)
		// );
	}, []);

	return (
		<ScrollView>
			<LayoutWrapper>
				<NavigateBack goBackHandler={goBack} />
				<Utils.QuestionIs question="Is this a placeholder?" />
				<Atoms.Text.Para style={styles.para}>
					Við sóttum textann sem fylgir vefsíðunni. Lestu yfir textann og athugaðu hvort
					þú sjáir svarið við spurningunni. Smelltu á efnisgreinina sem inniheldur
					svarið við spurningunni.
				</Atoms.Text.Para>
				<View style={styles.topLine}>
					<Image source={{ uri: article.source.logo }} style={styles.logo} />
					<Text>{article.title}</Text>
				</View>

				{state.error ? (
					<Atoms.Alerts.Ribbon
						item={{ type: "danger", label: "Ekki tókst að sækja grein" }}
					/>
				) : game.isLoading ? (
					<ActivityIndicator />
				) : (
					state.paragraphs.map((text) => (
						<TouchableOpacity onPress={handleSubmitParagraph}>
							<Atoms.Text.Para style={styles.textParagraph}>{text}</Atoms.Text.Para>
						</TouchableOpacity>
					))
				)}
			</LayoutWrapper>
		</ScrollView>
	);
};

export default ArticleReaderView;
