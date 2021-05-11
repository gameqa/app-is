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
				<View>
					<Organisms.Forms.Builder
						buttonLabel="Bua til adgang"
						form={{
							email: {
								type: InputElementTypes.text,
								value: "njall16@ru.is",
								label: "Log in",
							},
							password: {
								type: InputElementTypes.text,
								value: "",
								label: "Password",
							},
						}}
						url="/api/auth/authenticate"
						HTTPmethod="post"
						onSubmit={() => null}
					/>
				</View>
			</LayoutWrapper>
		</Provider>
	);
}
