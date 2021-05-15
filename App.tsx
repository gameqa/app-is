import React from "react";
import LayoutWrapper from "./src/layout";
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
		</Provider>
	);
}
