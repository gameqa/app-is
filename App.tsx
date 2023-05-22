import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import Views from "./src";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Require Cycle: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs()



export default () => {

	return (
		<Provider store={store}>
			<Views />
		</Provider>
	);
};
