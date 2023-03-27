import React from "react";
import { View, Text } from "react-native";
import { Atoms } from "../../..";
import { User } from "../../../../declerations";
import styles from "./styles";

const UserScoreCard = ({ scoreCard: data }: User) => {
	const calculateRatio = (count: number) =>
		(2 * Math.atan(0.25 * (count ?? 0))) / Math.PI;

	return (
		<View>
			{/* 
			
			Questions progress
			
			*/}
			<View style={styles.labelLine}>
				<Atoms.Text.Para>[[translation:9eb6138d-bbb5-447b-9440-a9b1f1062b43]]</Atoms.Text.Para>
				<Atoms.Text.Para>{data.questions}</Atoms.Text.Para>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.questions)}
				label=""
				color="warning"
			/>
			{/* 
			
			Answers progress 
			
			*/}
			<View style={styles.labelLine}>
				<Atoms.Text.Para>[[translation:7923fe3c-e9c7-44cb-bdf0-dad4c39b8daf]]</Atoms.Text.Para>
				<Atoms.Text.Para>{data.answers}</Atoms.Text.Para>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.answers)}
				label=""
				color="danger"
			/>
			{/* 
			
			Invites progress
			
			*/}
			<View style={styles.labelLine}>
				<Atoms.Text.Para>[[translation:64baabaa-5024-40ad-9020-56f7921ea11e]]</Atoms.Text.Para>
				<Atoms.Text.Para>{data.invites}</Atoms.Text.Para>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.invites)}
				label=""
				color="highlight"
			/>

			{/* Articles found progress  */}

			<View style={styles.labelLine}>
				<Atoms.Text.Para>[[translation:3472e80f-b8ef-4c51-85cc-9bf7124f8e79]]</Atoms.Text.Para>
				<Atoms.Text.Para>{data.articles}</Atoms.Text.Para>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.articles)}
				label=""
				color="highlight"
			/>

			{/* question qa progress */}
			<View style={styles.labelLine}>
				<Text>[[translation:335c874b-ee4b-4a6c-af75-8ee692590f2b]]</Text>
				<Text>{data.questionVerifications}</Text>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.questionVerifications)}
				label=""
				color="success"
			/>

			{/* Answer review progress */}
			<View style={styles.labelLine}>
				<Text>[[translation:f1af8ed8-14f6-491d-ab60-cf24c9434138]]</Text>
				<Text>{data.answerVerifications}</Text>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.answerVerifications)}
				label=""
				color="danger"
			/>
		</View>
	);
};

/**	{/* 
			
			question qa progress 
			
			<View style={styles.labelLine}>
				<Text>Yfirfarnar spurningar</Text>
				<Text>{data.questionVerifications}</Text>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.questionVerifications)}
				label=""
				color="success"
			/>
			
			Answer review progress 
			
			<View style={styles.labelLine}>
				<Text>Yfirfarin svör</Text>
				<Text>{data.answerVerifications}</Text>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.answerVerifications)}
				label=""
				color="danger"
			/>
			{/* 
			
			Articles found progress 
			
			<View style={styles.labelLine}>
				<Text>Vefsíður með svörum</Text>
				<Text>{data.articles}</Text>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={calculateRatio(data.articles)}
				label=""
				color="highlight"
			/> */

export default UserScoreCard;
