import React, { useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../../";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import PagePreview from "./PagePreview";
import styles from "./styles";

const GoogleSearch = () => {
	const [isFocusing, setIsfocusing] = useState(false);

	const state = useSelector((state: StoreState) => state.googleSearch);
	const dispatch = useDispatch();
	return (
		<View>
			<Utils.QuestionIs question={state.text} />
			<Atoms.Text.Para>
				Við þurfum að finna svarið við þessari spurningu. Notaðu Google leitarvélina hér
				fyrir neðan til að finna svarið á vefnum. Hún leitar bara inn á íslensku
				Wikipediu, Vísindavefnum, Vísir og MBL.
			</Atoms.Text.Para>
			<Atoms.Inputs.Google
				onChange={(val) => dispatch(Actions.GoogleSearch.writeGoogleQuery(val))}
				value={state.query}
				onSubmit={() => dispatch(Actions.GoogleSearch.fetchArticlesQuery())}
			/>

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
		</View>
	);
};

export default GoogleSearch;
