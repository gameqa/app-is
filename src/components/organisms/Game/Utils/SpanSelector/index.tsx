import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { IProps, SelectionStates } from "./interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../services";
import { Atoms, Organisms } from "../../../..";
import {
	setFirstWord,
	setLastWord,
} from "../../../../../actions/selectSpan";
import { useDispatch } from "react-redux";
import {
	addNotificationItem,
	clearNotifications,
} from "../../../../../actions/notification";

const SpanSelector = ({
	firstWord,
	lastWord,
	immutable,
	paragraph,
	onSelectFirstWord,
	onClearSelection,
	onSelectLastWord,
}: IProps) => {
	const [selectionState, setSelectionState] =
		useState<SelectionStates>();

	let action: ((v: number) => any) | undefined;

	const handleClick = useCallback(
		(i) => {
			if (firstWord === undefined) {
				onSelectFirstWord(i);
				firstWord = lastWord = -1;
				setSelectionState("select-first");
			} else if (lastWord === undefined) {
				onSelectLastWord(i);
				lastWord = firstWord;
				setSelectionState("select-last");
			} else {
				onClearSelection();
				setSelectionState("clear-selection");
			}
		},
		[firstWord, lastWord]
	);

	if (immutable) action = () => null;

	const shouldHighlight = (i: number) =>
		i == firstWord || (i >= firstWord! && i <= lastWord!);

	const wordArray = useMemo(() => paragraph.split(" "), [paragraph]);

	const dispatch = useDispatch();

	/**
	 * Show notification to user
	 */
	useEffect(() => {
		dispatch(clearNotifications());

		if (immutable) return;

		switch (selectionState) {
			case "select-first":
				dispatch(
					addNotificationItem({
						title: "Veldu fyrsta staf",
						text: "Smelltu á fyrsta stafinn sem þú heldur að svarið er",
					})
				);
			case "select-last":
				dispatch(
					addNotificationItem({
						title: "Veldu seinasta staf",
						text: "Smelltu á seinsta stafinn sem þú heldur að svarið er",
					})
				);
		}
	}, [selectionState, immutable]);

	return (
		<View>
			<View style={styles.para}>
				{wordArray.map((word, i) => (
					<TouchableOpacity
						onPress={() => handleClick(i)}
						activeOpacity={1}
					>
						<Text
							style={{
								...styles.word,
								color: shouldHighlight(i)
									? Colors.MapToDark.highlight
									: "#666",

								textDecorationLine: shouldHighlight(i)
									? "underline"
									: "none",
							}}
						>
							{word}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default SpanSelector;
