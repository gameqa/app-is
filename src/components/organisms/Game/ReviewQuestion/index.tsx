import React, { useState } from "react";
import { View } from "react-native";
import { Atoms } from "../../..";
import questions from "./questions";
import styles from "./styles";
import { Utils } from "../";
import { useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";

const ReviewQuestion = () => {
	const [items, setItems] = useState(questions);

	// const state = useSelector((state: StoreState) => )

	const markItem = (i: number) => {
		const copy = [...items];
		copy[i].value = !copy[i].value;
		setItems([...copy]);
	};

	return (
		<View>
			<Utils.QuestionIs question={"bla bla blab la"} />
			<Atoms.Text.Para style={styles.para}>
				Áður en við höldum af stað og finnum svarið við þessari spurningu, þá viljum við
				vera viss um að þetta sé góð spurning. Farðu yfir tékklistann hér fyrir neðan og
				hakaðu við þau atriði sem þú ert sammála
			</Atoms.Text.Para>
			{items.map((item, i) => (
				<Atoms.Cards.CheckListItem {...item} onPress={() => markItem(i)} />
			))}
		</View>
	);
};

export default ReviewQuestion;
