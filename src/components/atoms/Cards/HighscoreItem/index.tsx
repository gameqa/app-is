import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";

import { IProps } from "./interface";

const HighscoreItem = ({ user }: IProps) => {
	const { username, level, scoreCard } = user;
	const { hiscoreRank } = scoreCard;

	const currentUser = useSelector((state: StoreState) => state.auth);

	const isCurrent = useMemo(
		() => currentUser._id == user._id,
		[currentUser, user]
	);

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				backgroundColor: isCurrent ? "#EEE" : "white",
			}}
		>
			<View style={{ paddingHorizontal: 10, width: 55 }}>
				<Atoms.Text.Para># {hiscoreRank}</Atoms.Text.Para>
			</View>
			<Atoms.Users.Avatar {...user} />

			<View style={{ paddingHorizontal: 10 }}>
				<Atoms.Text.Heading>{username}</Atoms.Text.Heading>
				<Atoms.Text.Para>Lvl. {level}</Atoms.Text.Para>
			</View>
		</View>
	);
};

export default HighscoreItem;
