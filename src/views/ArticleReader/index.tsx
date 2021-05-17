import React from "react";
import { Image, Text, View } from "react-native";
import LayoutWrapper from "../../layout";
import { IProps } from "./interface";
import { NavigateBack } from "../utils";
import { Atoms } from "../../components";
import { Utils } from "../../components/organisms/Game";
import styles from "./styles";

const ArticleReaderView = ({
	route: { params: article },
	navigation: { goBack },
}: IProps) => {
	return (
		<LayoutWrapper>
			<NavigateBack goBackHandler={goBack} />
			<Utils.QuestionIs question="Is this a placeholder?" />
			<Atoms.Text.Para style={styles.para}>
				Við sóttum textann sem fylgir vefsíðunni. Lestu yfir textann og athugaðu hvort
				þú sjáir svarið við spurningunni.
			</Atoms.Text.Para>
			<View style={styles.topLine}>
				<Image source={{ uri: article.source.logo }} style={styles.logo} />
				<Text>{article.title}</Text>
			</View>
		</LayoutWrapper>
	);
};

export default ArticleReaderView;
