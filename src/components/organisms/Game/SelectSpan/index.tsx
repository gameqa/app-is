import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import * as Actions from "../../../../actions";
import { StoreState } from "../../../../reducers";

const SelectSpan = () => {
	// if it is true then user can locate answer span
	const [isSelectingSpan, setIsSelectingSpan] = useState(false);

	const state = useSelector((state: StoreState) => state.selectSpan);
	const dispatch = useDispatch();
	return (
		<View>
			<Utils.QuestionIs question={state.text} />
			<Utils.SpanSelector
				paragraph={state.paragraph}
				onSelectFirstWord={(i) => dispatch(Actions.SelectSpan.setFirstWord(i))}
				onSelectLastWord={(i) => dispatch(Actions.SelectSpan.setLastWord(i))}
				onClearSelection={() => dispatch(Actions.SelectSpan.clearRange())}
				firstWord={state.firstWord}
				lastWord={state.lastWord}
			/>
		</View>
	);
};

export default SelectSpan;
