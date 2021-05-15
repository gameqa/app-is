import { HookSignedNotification } from "../../components/organisms/Notifications";
import { ActionTypes } from "../types";
import {} from "./interface";

export const addNotificationItem = (payload: HookSignedNotification) => ({
	type: ActionTypes.addNotificationItem,
	payload,
});

export const setPriorityNotificationItem = (payload: HookSignedNotification) => ({
	type: ActionTypes.addPriorityNotificationItem,
	payload,
});

export const clearNotificationsById = (payload: string) => ({
	type: ActionTypes.clearNotificationItemsById,
	payload,
});

export * as Actions from "./interface";
