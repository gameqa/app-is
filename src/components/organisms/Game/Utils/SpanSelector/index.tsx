import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { IProps, SelectionStates } from "./interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../services";
import { Atoms, Organisms } from "../../../..";

const SpanSelector = ({
	firstWord,
	lastWord,
	immutable,
	paragraph,
	onSelectFirstWord,
	onClearSelection,
	onSelectLastWord,
}: IProps) => {
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

	const shouldHighlight = (i: number) => i >= firstWord! && i <= lastWord!;

	const { addPriority } = Organisms.Notifications.Hooks.useAddItems();

	return (
		<View>
			<View style={styles.para}>
				{paragraph.split(" ").map((word, i) => (
					<TouchableOpacity onPress={() => action?.(i)} activeOpacity={1}>
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
			{selectionState === "clear-selection" && !immutable ? (
				<Atoms.Buttons.Base label="Staðfesta" type="highlight" />
			) : null}
		</View>
	);
};

export default SpanSelector;
