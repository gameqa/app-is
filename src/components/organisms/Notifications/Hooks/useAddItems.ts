import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Notification } from "../interface";
import * as Actions from "../../../../actions";

const useAddItems = () => {
	const [id, setId] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const gen = genUUID();
		setId(gen);
		return () => {
			dispatch(Actions.Notifications.clearNotificationsByHookId(gen));
		};
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

	const addStandard = useCallback(
		(item: Notification) =>
			dispatch(
				Actions.Notifications.addNotificationItem({
					...item,
					hookId: id,
					id: genUUID(),
				})
			),
		[id]
	);

	const addPriority = useCallback(
		(item: Notification) =>
			dispatch(
				Actions.Notifications.setPriorityNotificationItem({
					...item,
					hookId: id,
					id: genUUID(),
				})
			),
		[id]
	);

	const clearAll = useCallback(
		() => dispatch(Actions.Notifications.clearNotificationsByHookId(id)),
		[id]
	);

	return {
		addStandard,
		addPriority,
		clearAll,
	};
};

export default useAddItems;
