import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import Views from "./src";

export default () => {
	React.useEffect(() => {
		console.log(process.env.GOOGLE_SERVICES_PLIST);
		console.log(process.env.GOOGLE_SERVICES_JSON);
	}, []);

	return (
		<Provider store={store}>
			<Views />
		</Provider>
	);
};
