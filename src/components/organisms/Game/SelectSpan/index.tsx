import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../..";
import * as Actions from "../../../../actions";
import { StoreState } from "../../../../reducers";

const SelectSpan = () => {
	// if it is true then user can locate answer span
	const [isSelectingSpan, setIsSelectingSpan] = useState(false);

	const state = useSelector((state: StoreState) => state.selectSpan);
	const dispatch = useDispatch();

	const handleArchive = () => {
		// TODO: implement and add ALERT logic
	};

	const toogleSelectionState = () => setIsSelectingSpan((v) => !v);

	return (
		<View>
			<Utils.QuestionIs question={state.text} />
			<Atoms.Text.Para>
				Þessi efnisgrein var valin af öðrum notanda sem telur að svarið sé hér að finna.
				Nú þurfum við að vita hvort hluti af textanum svari spurningunni. Ef svo er, þá
				þurfum við að velja réttu orðin sem mynda svarið.
			</Atoms.Text.Para>
			<Utils.SpanSelector
				paragraph={state.paragraph}
				onSelectFirstWord={(i) => dispatch(Actions.SelectSpan.setFirstWord(i))}
				onSelectLastWord={(i) => dispatch(Actions.SelectSpan.setLastWord(i))}
				onClearSelection={() => dispatch(Actions.SelectSpan.clearRange())}
				firstWord={state.firstWord}
				lastWord={state.lastWord}
				immutable={!isSelectingSpan}
			/>
			{!isSelectingSpan ? (
				<React.Fragment>
					<Atoms.Buttons.Base
						label="Ég sé svarið"
						type="success"
						onPress={toogleSelectionState}
					/>
					<Atoms.Buttons.Base
						label="Ég sé ekki svarið"
						type="danger"
						onPress={handleArchive}
					/>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Atoms.Buttons.Base
						label="Til baka"
						type="danger"
						onPress={toogleSelectionState}
					/>
				</React.Fragment>
			)}
		</View>
	);
};

export default SelectSpan;
