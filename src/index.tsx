import React from "react";
import store from "../store";
import { useDispatch, useSelector } from "react-redux";
import * as Routing from "./routing";
import { Organisms } from "./components";
import * as Actions from "./actions";
import { StoreState } from "./reducers";

export default function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state: StoreState) => state.auth);

	React.useEffect(() => {
		dispatch(Actions.Auth.fetchUserFromToken());
		if (!["loading", "guest"].includes(auth.type))
			dispatch(Actions.Game.fetchCurrentGameRound());
	}, [auth._id]);

	return (
		<React.Fragment>
			<Organisms.Notifications.Items />
			<Routing.AuthStackNavigator />
			<Routing.TabNavigator />
			<Organisms.Game.Utils.AnnounceScreen />
		</React.Fragment>
	);
}
