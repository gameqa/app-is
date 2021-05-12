import React from "react";
import { View, Text } from "react-native";
import { Atoms } from "../../..";
import { User } from "../../../../declerations";

const UserScoreCard = ({ scoreCard }: User) => {
	return (
		<View>
			<Atoms.Charts.ProgressBar ratio={0.7} label="" color="danger" />
			<Atoms.Charts.ProgressBar ratio={0.7} label="" color="danger" />
			<Atoms.Charts.ProgressBar ratio={0.7} label="" color="danger" />
			<Atoms.Charts.ProgressBar ratio={0.7} label="" color="danger" />
			<Atoms.Charts.ProgressBar ratio={0.7} label="" color="danger" />
		</View>
	);
};

export default UserScoreCard;
