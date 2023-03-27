import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { IProps, SelectionStates } from "./interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../services";

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
		useState<SelectionStates>("select-first");

	let action: ((v: number) => any) | undefined;

	const handleClick = useCallback(
		(i) => {
			if (immutable) return;

			if (firstWord === undefined) {
				onSelectFirstWord(i);
				firstWord = lastWord = -1;
				setSelectionState("select-last");
			} else if (lastWord === undefined) {
				onSelectLastWord(i);
				lastWord = firstWord;
				setSelectionState("clear-selection");
			} else {
				onClearSelection();
				setSelectionState("select-first");
			}
		},
		[firstWord, lastWord, immutable]
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
						title: "[[translation:02fe5731-80ab-4216-8cac-1e93b6ba7f28]]",
						text: "[[translation:948e93b8-77bb-453d-a604-af480a4998a0]]",
					})
				);
				break;
			case "select-last":
				dispatch(
					addNotificationItem({
						title: "[[translation:5f53f041-9ebf-4a81-87ad-c4a0bf0852eb]]",
						text: "[[translation:8e058ed8-7d7c-45ae-95ba-2fe3a227d6f1]]",
					})
				);
				break;
			case "clear-selection":
				dispatch(
					addNotificationItem({
						title: "[[translation:e762e8f0-30b5-4b38-9d0a-d072e85b6d15]]",
						text: "[[translation:fa7a48e5-0b40-4a24-9edb-ef614c645e13]]",
					})
				);
				break;
		}

		return () => {
			dispatch(clearNotifications());
		};
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
