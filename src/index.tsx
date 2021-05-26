import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Routing from "./routing";
import { Organisms } from "./components";
import * as Actions from "./actions";
import { StoreState } from "./reducers";
import * as Views from "./views";
import * as Hooks from "./hooks";

export default function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state: StoreState) => state.auth);
	const pushNotifications = useSelector((state: StoreState) => state.pushNotification);

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
	}, []);

	// fired when notification is received while app is open
	Hooks.Notifications.useNotificationListener((item) => {
		console.log("NEW NOTIFICATION:", item);
	});

	// fired when notification response is received
	Hooks.Notifications.useResponseListener((response) => {
		console.log("NEW NOTIFICATION RESPONSE:", response);
	});

	// handle get permission
	Hooks.Notifications.useRequestPermission((token) => {
		dispatch(Actions.PushNotification.sendPushNotificationToken(token));
	});

	if (auth.type === "not-verified") return <Views.AuthCode />;
	return (
		<React.Fragment>
			<Organisms.Notifications.Items />
			<Routing.AuthStackNavigator />
			<Routing.TabNavigator />
			<Organisms.Game.Utils.AnnounceScreen />
		</React.Fragment>
	);
}
