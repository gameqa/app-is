import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../../reducers";
import * as Declerations from "../../../../declerations";
import * as Actions from "../../../../actions";
import * as Services from "../../../../services";
import styles from "./styles";
import { Atoms } from "../../..";
import * as config from "../../../../config";

const COUNT_DOWN = 4;

const Motivation = () => {
	const motivation = useSelector(
		(state: StoreState) => state.motivation
	);
	const dispatch = useDispatch();
	const [count, setCount] = useState(COUNT_DOWN);

	const RenderSocialImpact = ({
		imageURL,
		description,
	}: Declerations.ISocialImpact) => (
		<React.Fragment>
			<View style={styles.descriptionOuter}>
				<Atoms.Text.Para style={styles.description}>
					{description}
				</Atoms.Text.Para>
			</View>
			<Image
				style={styles.image}
				source={{
					uri: imageURL,
				}}
			/>
		</React.Fragment>
	);

	const RenderInviteOthers = ({
		description,
	}: Declerations.IInviteOthers) => (
		<React.Fragment>
			<View style={styles.centerIcons}>
				<Text style={styles.inviteIcon}>[[translation:20abd71d-22c7-457b-9498-70e41f539968]]</Text>
				<Text style={styles.inviteIcon}>[[translation:ee544bdc-6141-4ee8-ab7f-fa6a78cf5c5f]]</Text>
				<Text style={styles.inviteIcon}>[[translation:5466e9ee-6ea5-4780-a89c-7c4d017fc73d]]</Text>
				<Text style={styles.inviteIcon}>[[translation:89d019d5-f291-414c-a161-fbca90593a6d]]</Text>
				<Text style={styles.inviteIcon}>[[translation:2e9c8812-372e-4b0d-af84-636e4e561c9e]]</Text>
			</View>
			<Atoms.Text.Para style={styles.inviteText}>
				{description}
			</Atoms.Text.Para>
		</React.Fragment>
	);

	const RenderCloseToPrize = ({
		text,
		prizeId,
	}: Declerations.ICloseToPrize) => (
		<View
			style={{
				...styles.background,
				backgroundColor: "white",
			}}
		>
			<Image
				style={styles.chest}
				source={Services.Chests.mapIdToNoPrize(prizeId)}
			/>

			<Atoms.Text.Heading style={styles.closeToPrizeText}>
				{Services.Chests.mapIdtoName(prizeId)}
			</Atoms.Text.Heading>

			<Atoms.Text.Para style={styles.closeToPrizeText}>
				{text}. [[translation:069990cf-44ef-4c10-aa6f-67ceef76f5b1]]
			</Atoms.Text.Para>
		</View>
	);

	const RenderFactory = useCallback((props: Declerations.Motivation) => {
		switch (props?.type) {
			case "social-impact":
				return <RenderSocialImpact {...props} />;
			case "invite-others":
				return <RenderInviteOthers {...props} />;
			case "close-to-prize":
				if(config.SHOW_BOX_OVERLAYS)
					return <RenderCloseToPrize {...props} />;
				handleHide();
				return null;
			default:
				handleHide();
				return null;
		}
	}, []);

	const handleHide = useCallback(() => {
		dispatch(Actions.Overlay.dequeOverlay());
	}, [count, motivation.current]);

	useEffect(() => {
		return () => {
			dispatch(Actions.Motivation.fetchMotivation());
		};
	}, []);

	useEffect(() => {
		const MS_IN_S = 1000;

		if (count === 0) handleHide();
		else {
			const interval = setInterval(() => {
				setCount((c) => c - 1);
			}, MS_IN_S);
			return () => {
				clearInterval(interval);
			};
		}
	}, [count, handleHide]);

	if (motivation.current === undefined) return <React.Fragment />;
	return (
		<View style={styles.outer}>
			<View style={styles.counterOuter}>
				<Atoms.Text.Para>{count}</Atoms.Text.Para>
			</View>
			<RenderFactory {...motivation.current} />
		</View>
	);
};

export default Motivation;
