import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";
import { styles } from "./styles";

const ReviewAnswer = () => {
	type ReviewStage =
		| "verify-answer"
		| "verify-yes-no-answer"
		| "verify-length";
	const [stage, setStage] = useState<ReviewStage>("verify-answer");

	const state = useSelector((state: StoreState) => state.selectSpan);
	const game = useSelector((state: StoreState) => state.game);

	useEffect(() => {
		setStage("verify-answer");
	}, [game.lastLoaded]);

	const dispatch = useDispatch();

	const handleVerifyDispatch = (canBeShortened: boolean) => {
		dispatch(
			Actions.Game.verifyAnswerSpan(
				game._id,
				state._id,
				canBeShortened
			)
		);
	};

	const handleVerifyYesOrNo = (answer: boolean) => {
		dispatch(
			Actions.Game.verifyYesNoQuestion(game._id, state._id, answer)
		);
	};

	const handleArchive = () => {
		dispatch(Actions.Game.archiveAnswer(game._id, state._id));
	};

	return (
		<View style={styles.outer}>
			<ScrollView>
        <Utils.QuestionIs question={state.text} />
			<Utils.Explain>
				Annar notandi hefur merkt svarið inn. Nú þurfum við að
				athuga hvort svarið sé rétt merkt. 🖊️🤔
			</Utils.Explain>
			<Utils.SpanSelector
				immutable={true}
				{...state}
				firstWord={state.isYesOrNo ? -1 : state.firstWord}
				lastWord={state.isYesOrNo ? -1 : state.lastWord}
				onSelectFirstWord={(word) => dispatch(Actions.SelectSpan.setFirstWord(word))}
				onSelectLastWord={(word) => dispatch(Actions.SelectSpan.setLastWord(word))}
				onClearSelection={() => dispatch(Actions.SelectSpan.clearRange())}
			/>
      </ScrollView>
			<View>
        
				{stage === "verify-answer" ? (
					state.isYesOrNo ? (
						<React.Fragment>
							<Atoms.Buttons.Base
								label="Svarið er hnitmiðað"
								onPress={() => handleVerifyDispatch(false)}
								type="success"
							/>
							<Atoms.Buttons.Base
								label="Svarið gæti verið styttra"
								onPress={() => handleVerifyDispatch(true)}
								type="danger"
							/>
							<Atoms.Buttons.Base
								label="Til baka"
								onPress={() => setStage("verify-answer")}
								type="highlight"
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Atoms.Buttons.Base
								label="Ég held að svarið sé rétt"
								onPress={() => setStage("verify-length")}
								type="success"
							/>
							<Atoms.Buttons.Base
								label="Ég held að svarið sé rangt"
								onPress={handleArchive}
								type="danger"
							/>
						</React.Fragment>
					)
				) : stage === "verify-length" ? (
					<React.Fragment>
						<Atoms.Buttons.Base
							label="Svarið er hnitmiðað"
							onPress={() => handleVerifyDispatch(false)}
							type="success"
						/>
						<Atoms.Buttons.Base
							label="Svarið gæti verið styttra"
							onPress={() => handleVerifyDispatch(true)}
							type="danger"
						/>
						<Atoms.Buttons.Base
							label="Til baka"
							onPress={() => setStage("verify-answer")}
							type="highlight"
						/>
					</React.Fragment>
				) : stage === "verify-yes-no-answer" ? (
					<React.Fragment>
					<Atoms.Buttons.Base
						label="Svarið er já samkvæmt greininni"
						onPress={() => handleVerifyYesOrNo(true)}
						type="success"
					/>
					<Atoms.Buttons.Base
						label="Svarið er nei samkvæmt greininni"
						onPress={() => handleVerifyYesOrNo(false)}
						type="danger"
					/>
					<Atoms.Buttons.Base
						label="Til baka"
						onPress={() => setStage("verify-answer")}
						type="highlight"
					/>
				</React.Fragment>
				) : null}
			</View>
		</View>
	);
};

export default ReviewAnswer;
