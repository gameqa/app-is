import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import * as Routing from "./src/routing";
import { Organisms } from "./src/components";

export default function App() {
	return (
		<Provider store={store}>
			<Organisms.Notifications.Items />
			<Routing.AuthStackNavigator />
			<Routing.TabNavigator />
			<Organisms.Game.Utils.AnnounceScreen />
		</Provider>
	);
}
