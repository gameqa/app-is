import React from "react";
import LayoutWrapper from "./src/layout";
import store from "./store";
import { Provider } from "react-redux";
import Routing from "./src/routing";

export default function App() {
	return (
		<Provider store={store}>
			<Routing />
		</Provider>
	);
}
