import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../";
import { Atoms } from "../../..";
import * as Actions from "../../../../actions";
import { StoreState } from "../../../../reducers";

const SelectSpan = () => {
	// if it is true then user can locate answer span
	const [isSelectingSpan, setIsSelectingSpan] = useState(false);

	const state = useSelector((state: StoreState) => state.selectSpan);
	const game = useSelector((state: StoreState) => state.game);
	const auth = useSelector((state: StoreState) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		setIsSelectingSpan(false);
	}, [game.lastLoaded]);

	const archiveKey = useMemo(
		() => `GAME:SELECTSPAN:ARCHIVEWARNING:${auth._id}`,
		[auth._id]
	);

	// returns ture if key has been acknowledged by user before
	const checkIfHasSeenKey = useCallback(async (): Promise<boolean> => {
		try {
			const value = await AsyncStorage.getItem(archiveKey);
			return value !== null;
		} catch (error) {
			return false;
		}
	}, [archiveKey]);

	// stores key as seen
	const markKeyAsSeen = useCallback(async () => {
		try {
			const SEEN_TOKEN = "OK";
			AsyncStorage.setItem(archiveKey, SEEN_TOKEN);
		} catch (error) {
			//
		}
	}, [archiveKey]);

	const handleCompleteStep = useCallback(async () => {
		try {
			dispatch(Actions.Game.archiveAnswer(game._id, state._id));
			await markKeyAsSeen();
		} catch (error) {
			//
		}
	}, [game._id, state._id, state.firstWord, state.lastWord]);

	const handleArchive = useCallback(async () => {
		const hasSeenKey = await checkIfHasSeenKey();
		if (hasSeenKey) {
			dispatch(Actions.Game.archiveAnswer(game._id, state._id));
		} else {
			Alert.alert(
				"Ekkert svar",
				"Ef þú sérð ekki svarið hér þá eyðum við þessari efnisgrein.",
				[
					{
						text: "Hætta við",
						onPress: () => markKeyAsSeen(),
					},
					{
						text: "Já",
						onPress: () => handleCompleteStep(),
					},
				]
			);
		}
	}, [game._id, state._id, markKeyAsSeen, handleCompleteStep]);

	const toogleSelectionState = () => setIsSelectingSpan((v) => !v);

	const handleSubmit = useCallback(
		() =>
			dispatch(
				Actions.Game.submitSpan(
					game._id,
					state._id,
					state.firstWord,
					state.lastWord
				)
			),
		[game._id, state._id, state.firstWord, state.lastWord]
	);

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<ScrollView>
				<Utils.QuestionIs question={state.text} />
				<Atoms.Text.Para>
					Þessi efnisgrein var valin af öðrum notanda sem telur
					að svarið sé hér að finna. Nú þurfum við að vita hvort
					hluti af textanum svari spurningunni. Ef svo er, þá
					þurfum við að velja réttu orðin sem mynda svarið.
				</Atoms.Text.Para>
				<Utils.SpanSelector
					paragraph={state.paragraph}
					onSelectFirstWord={(i) =>
						dispatch(Actions.SelectSpan.setFirstWord(i))
					}
					onSelectLastWord={(i) =>
						dispatch(Actions.SelectSpan.setLastWord(i))
					}
					onClearSelection={() =>
						dispatch(Actions.SelectSpan.clearRange())
					}
					firstWord={state.firstWord}
					lastWord={state.lastWord}
					immutable={!isSelectingSpan}
				/>
			</ScrollView>
			<View>
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
					<>
						{state.firstWord && state.lastWord && (
							<Atoms.Buttons.Base
								label="Staðfesta"
								type="highlight"
								inactive={false}
								onPress={() => handleSubmit()}
							/>
						)}
						<React.Fragment>
							<Atoms.Buttons.Base
								label="Til baka"
								type="danger"
								onPress={toogleSelectionState}
							/>
						</React.Fragment>
					</>
				)}
			</View>
		</View>
	);
};

export default SelectSpan;
