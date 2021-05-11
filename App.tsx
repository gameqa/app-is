import React from "react";
import { StyleSheet, View } from "react-native";
import { Organisms } from "./src/components";
import { InputElementTypes } from "./src/declerations";
import LayoutWrapper from "./src/layout";
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
	return (
		<Provider store={store}>
			<LayoutWrapper>
				<React.Fragment />
			</LayoutWrapper>
		</Provider>
	);
}
