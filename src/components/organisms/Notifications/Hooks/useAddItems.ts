import { useEffect, useCallback, useState } from "react";
import { Notification } from "../interface";

const useAddItems = () => {
	const [id, setId] = useState("");

	useEffect(() => {
		setId(genUUID());
		return () => {};
	}, []);

	/**
	 * function that generates a UUID v4 written by
	 * https://stackoverflow.com/a/2117523
	 * @returns UUID string
	 */
	const genUUID = () => {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	};

	const addStandard = useCallback((item: Notification) => null, [id]);
	const addPriority = useCallback((item: Notification) => null, [id]);

	return {
		addStandard,
		addPriority,
	};
};

export default useAddItems;
