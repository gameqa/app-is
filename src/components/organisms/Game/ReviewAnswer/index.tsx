import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import * as Actions from "../../../../actions";

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
		<ScrollView>
			<Utils.QuestionIs question={state.text} />
			<Atoms.Text.Para>
				Annar notandi hefur merkt svarið við spurningunni í
				efnisgreininni hér fyrir neðan. Nú þurfum við að athuga
				hvort svarið sé rétt merkt.
			</Atoms.Text.Para>
			<Utils.SpanSelector
				immutable={true}
				{...state}
				firstWord={state.isYesOrNo ? -1 : state.firstWord}
				lastWord={state.isYesOrNo ? -1 : state.lastWord}
			/>
			{stage === "verify-answer" ? (
				state.isYesOrNo ? (
					<React.Fragment>
						<Atoms.Buttons.Base
							label="Svarið er hér"
							onPress={() =>
								setStage("verify-yes-no-answer")
							}
							type="success"
						/>
						<Atoms.Buttons.Base
							label="Svarið er ekki hér"
							onPress={handleArchive}
							type="danger"
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
		</ScrollView>
	);
};

export default ReviewAnswer;
