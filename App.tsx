import React from "react";
import LayoutWrapper from "./src/layout";
import store from "./store";
import { Provider } from "react-redux";
import * as Views from "./src/views";

export default function App() {
	return (
		<Provider store={store}>
			<LayoutWrapper>
				<Views.UserProgress />
			</LayoutWrapper>
		</Provider>
	);
}
