import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Routing from "./routing";
import { Organisms } from "./components";
import * as Actions from "./actions";
import { StoreState } from "./reducers";
import * as Views from "./views";
import { StatusBar } from "react-native";
import Linking from "expo-linking";
import Branch from "expo-branch";
import parseUrl from "parse-url";

console.disableYellowBox = true;

export default function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state: StoreState) => state.auth);
	const pushNotifications = useSelector(
		(state: StoreState) => state.pushNotification
	);

	// fetch user from cookie
	React.useEffect(() => {
		dispatch(Actions.Auth.fetchUserFromToken());
		const isAuth = !["loading", "guest"].includes(auth.type);
		if (isAuth) {
			dispatch(Actions.Game.fetchCurrentGameRound());
		}
		if (isAuth && !pushNotifications.hasPermission) {
			// ask for permission
		}
	}, [auth._id]);

	// fetch chart data on load
	React.useEffect(() => {
		dispatch(Actions.ChartData.fetchAnswersPerDay());
		StatusBar.setHidden(true);
	}, []);

	Branch.subscribe((bundle) => {
		if (bundle.error) {
			console.error("Error: ", bundle.error);
			return;
		}

		if (!bundle.params) {
			console.log("Error no param");
			return;
		}

		const link = bundle.params["~referring_link"];

		if (!link) {
			console.log("Missing link");
			return;
		}

		const parsed = parseUrl(link);

		dispatch(
			Actions.DeepLinks.setLink({
				path: parsed.pathname,
				query: parsed.query,
			})
		);
	});

	if (auth.type === "not-verified") return <Views.AuthCode />;
	return (
		<React.Fragment>
			<Routing.AuthStackNavigator />
			<Routing.TabNavigator />
			<Organisms.Overlay />
		</React.Fragment>
	);
}
