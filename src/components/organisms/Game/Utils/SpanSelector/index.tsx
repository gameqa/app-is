import React, { useEffect, useMemo, useState } from "react";
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
	onComplete,
}: IProps) => {
	const [canContinue, setCanContinue] = useState(false);

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

	const shouldHighlight = (i: number) =>
		i >= firstWord! && i <= lastWord!;

	const { addPriority } = Organisms.Notifications.Hooks.useAddItems();

	useEffect(() => {
		if (immutable) return;
		switch (selectionState) {
			case "select-first":
				addPriority({
					title: "Fyrsta orðið",
					description:
						"Smelltu á fyrsta orðið sem myndar svarið.",
					type: "idea",
				});
				break;
			case "select-last":
				addPriority({
					title: "Síðasta orðið",
					description:
						"Smelltu á síðasta orðið sem myndar svarið. Ef svarið er bara eitt orð, smelltu þá á sama arðið.",
					type: "idea",
				});
				break;
			case "clear-selection":
				addPriority({
					title: "Búin/n?",
					description:
						"Ef valið er rétt, þá getur þú staðfest valið. Til þess að velja aftur þá getur þú hreinsað valið með því að smella hvar sem er á textann.",
					type: "idea",
				});
				setCanContinue(selectionState === "clear-selection");
		}
	}, [selectionState, immutable]);

	const wordArray = useMemo(() => paragraph.split(" "), [paragraph]);

	return (
		<View>
			<View style={styles.para}>
				{wordArray.map((word, i) => (
					<TouchableOpacity
						onPress={() => action?.(i)}
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
			{canContinue && !immutable ? (
				<Atoms.Buttons.Base
					label="Staðfesta"
					type="highlight"
					inactive={!canContinue}
					onPress={onComplete}
				/>
			) : null}
		</View>
	);
};

export default SpanSelector;
