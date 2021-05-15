import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import { IProps } from "./interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../services";

const SpanSelector = ({
	firstWord,
	lastWord,
	immutable,
	paragraph,
	onSelectFirstWord,
	onClearSelection,
	onSelectLastWord,
}: IProps) => {
	type SelectionStates = "select-first" | "select-last" | "clear-selection";
	let selectionState: SelectionStates;

	let action: ((v: number) => any) | undefined;
	if (firstWord === undefined) {
		action = onSelectFirstWord;
		lastWord = firstWord = -1; // this is a side effect
		selectionState = "select-first";
	} else if (lastWord === undefined) {
		action = onSelectLastWord;
		lastWord = firstWord; // this is a side effect
		selectionState = "select-last";
	} else {
		action = onClearSelection;
		selectionState = "clear-selection";
	}

	if (immutable) action = () => null;

	const [areInstructionsLoading, setAreInstructionsLoading] = useState(false);

	const userInstructions = [
		["Smelltu á fyrsta stafinn sem myndar svarið"],
		["Smelltu á síðasta stafinn sem myndar svarið"],
		[
			"Smelltu á textann til þess að velja aftur",
			"Smelltu á „Staðfesta“ til þess að staðfesta orða val",
		],
	];

	const getStage = () => {
		if (selectionState === "select-first") return 0;
		else if (selectionState === "select-last") return 1;
		return 2;
	};

	useEffect(() => {
		const LOADING_TIMEOUT = 350;
		if (areInstructionsLoading) {
			const t = setTimeout(() => setAreInstructionsLoading(false), LOADING_TIMEOUT);
			return () => {
				// cleanup
				clearTimeout(t);
			};
		}
	}, [areInstructionsLoading]);

	useEffect(() => {
		setAreInstructionsLoading(true);
	}, [selectionState]);

	// useEffect(() => {
	// 	if (getStage() === 2) onComplete?.();
	// }, [getStage()]);

	const shouldHighlight = (i: number) => i >= firstWord! && i <= lastWord!;

	return (
		<View>
			<View>
				{userInstructions[0].map((text) => (
					<Text>{text}</Text>
				))}
			</View>
			<View style={styles.para}>
				{paragraph.split(" ").map((word, i) => (
					<TouchableOpacity onPress={() => action?.(i)}>
						<Text
							style={{
								...styles.word,
								color: shouldHighlight(i) ? Colors.MapToDark.highlight : "#666",
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
