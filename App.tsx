import React from "react";
import { StyleSheet, View } from "react-native";
import { Organisms } from "./src/components";
import { InputElementTypes } from "./src/declerations";

export default function App() {
	return (
		<View style={styles.container}>
			<Organisms.Forms.Builder
				buttonLabel="Log-in"
				form={{
					test: {
						type: InputElementTypes.text,
						value: "asdf",
						label: "asdff",
					},
				}}
				url="/"
				HTTPmethod="post"
				onSubmit={() => null}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
