import React, { useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../../";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import PagePreview from "./PagePreview";
const GoogleSearch = () => {
	const [isFocusing, setIsfocusing] = useState(false);

	const state = useSelector((state: StoreState) => state.googleSearch);
	const dispatch = useDispatch();
	return (
		<View>
			<Utils.QuestionIs question="is this a placeholder?" />
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
			{state.articles.map((item) => (
				<PagePreview {...item} />
			))}
		</View>
	);
};

export default GoogleSearch;
