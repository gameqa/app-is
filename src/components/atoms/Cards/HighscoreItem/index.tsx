import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Atoms } from "../../..";
import { StoreState } from "../../../../reducers";
import { Colors } from "../../../../services";
import { IProps, IRenderTextProps } from "./interface";

const HighscoreItem = ({ user }: IProps) => {
	const { username, streak, scoreCard } = user;
	const { hiscoreRank } = scoreCard;

	const currentUser = useSelector((state: StoreState) => state.auth);

	const isCurrent = useMemo(
		() => currentUser._id == user._id,
		[currentUser, user]
	);

	const RenderText = (props: IRenderTextProps) =>
		isCurrent ? (
			<Atoms.Text.Heading
				style={{ color: Colors.MapToDark["white"] }}
			>
				{props.children}
			</Atoms.Text.Heading>
		) : (
			<Atoms.Text.Para>{props.children}</Atoms.Text.Para>
		);

	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: isCurrent
					? Colors.MapToDark.highlight
					: "white",
				height: 80,
				marginBottom: 2,
				paddingVertical: 5,
				borderBottomWidth: 1,
				borderBottomColor: "#eee",
			}}
		>
			<View
				style={{
					height: "100%",
					justifyContent: "center",
					paddingHorizontal: 10,
				}}
			>
				<RenderText># {hiscoreRank}</RenderText>
			</View>
			<Atoms.Users.Avatar {...user} color="highlight" />

			<View
				style={{
					paddingHorizontal: 10,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					flex: 1,
				}}
			>
				<RenderText>{username}</RenderText>
				<RenderText>
					{streak > 1 ? `${streak}🔥` : null}
				</RenderText>
			</View>
		</View>
	);
};

export default HighscoreItem;
