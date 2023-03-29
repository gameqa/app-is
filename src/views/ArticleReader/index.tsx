import React, { useEffect, useCallback } from "react";
import {
	Image,
	Text,
	View,
	TouchableOpacity,
	Alert,
	ScrollView,
	RefreshControl,
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

const ArticleReaderView = ({
	route: { params: article },
	navigation: { goBack },
}: IProps) => {
	const state = useSelector((state: StoreState) => state.articleReader);
	const game = useSelector((state: StoreState) => state.game);
	const googleSearch = useSelector(
		(state: StoreState) => state.googleSearch
	);

	const dispatch = useDispatch();

	const handleFetchArticle = useCallback(
		() =>
			dispatch(
				Actions.ArticleReader.previewArticleToSubmit(
					article.source.identifier,
					article.articleKey
				)
			),
		[article.source?.identifier, article.articleKey]
	);
	useEffect(() => {
		handleFetchArticle();
	}, [article._id]);

	const handleSubmitParagraph = useCallback(
		(paragraphIndex: number) => {
			Alert.alert(
				"[[translation:43ad9161-97e6-4bac-9b90-1e08e5537118]]",
				"[[translation:cc04c157-b887-40f6-8a7a-d0e80b5dbdec]]",
				[
					{
						text: "[[translation:b1e80198-9c0f-433b-b352-0a7d84dbc635]]",
						onPress: () => null,
					},
					{
						text: "[[translation:17b6284a-7cac-430b-9815-705e1737a072]]",
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
				]
			);
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
		<LayoutWrapper>
			<ScrollView
				refreshControl={
					<RefreshControl
						onRefresh={handleFetchArticle}
						refreshing={game.isLoading}
					/>
				}
			>
				<NavigateBack goBackHandler={goBack} />
				<Utils.QuestionIs question={googleSearch.text} />
				<Utils.Explain>
				[[translation:29930e79-e5a6-4a8a-80d9-aa1f28878b53]] [[translation:8474d3ed-c4d0-4c3f-a627-83e374cbe4cc]][[translation:518de081-a2c2-44fd-a301-ead55605c482]]
				</Utils.Explain>
				<View style={styles.topLine}>
					<Image
						source={{ uri: article.source.logo }}
						style={styles.logo}
					/>
					<Text>{article.title}</Text>
				</View>

				{state.error ? (
					<Atoms.Alerts.Ribbon
						item={{
							type: "danger",
							label: "[[translation:fcf6cdd8-0f87-4fbc-b11c-5ac09432f813]]",
						}}
					/>
				) : (
					state.paragraphs.map((text, i) => (
						<TouchableOpacity
							onPress={() => handleSubmitParagraph(i)}
							style={styles.paragraphOuter}
						>
							<Atoms.Text.Heading style={styles.enumeration}>
								{i + 1}
							</Atoms.Text.Heading>

							<Atoms.Text.Para style={styles.textParagraph}>
								{text}
							</Atoms.Text.Para>
						</TouchableOpacity>
					))
				)}
			</ScrollView>
		</LayoutWrapper>
	);
};

export default ArticleReaderView;
