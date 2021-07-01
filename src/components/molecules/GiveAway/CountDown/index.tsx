import React from "react";
import { View } from "react-native";
import styles from "./styles";

import { IProps } from "./interface";

import * as Atoms from "../../../atoms";
import * as Services from "../../../../services";

import CountDown from "react-native-countdown-component";

const CountDownComponent = (props: IProps) => {
	const { time, isCounting, isLoading, onFinish, onPress } = props;

	const timeLabels = {
		d: Services.CountDownLabel.MapToIcelandic.Days,
		h: Services.CountDownLabel.MapToIcelandic.Hours,
		m: Services.CountDownLabel.MapToIcelandic.Minutes,
		s: Services.CountDownLabel.MapToIcelandic.Seconds,
	};

	if (isLoading) return null;
	return (
		<View>
			{isCounting ? (
				<View style={styles.outer}>
					<Atoms.Text.Heading style={styles.heading}>
						Útdráttur á Facebook eftir
					</Atoms.Text.Heading>

					<CountDown
						until={time}
						onFinish={() => onFinish()}
						onPress={() => onPress()}
						size={20}
						timeLabels={timeLabels}
						digitStyle={styles.digitStyle}
						digitTxtStyle={styles.digitTxtStyle}
					/>
				</View>
			) : (
				<View style={styles.outer}>
					<Atoms.Text.Heading style={styles.giveAwayDrawText}>
						Við erum að draga út vinninga á facebook síðunni
						okkar.🥳🥳
					</Atoms.Text.Heading>
				</View>
			)}
		</View>
	);
};

export default CountDownComponent;
