import { Organisms } from "../../components";
import { ActionTypes } from "../types";

export interface AddNotificationItemAction {
	type: ActionTypes.addNotificationItem;
	payload: Organisms.Notifications.HookSignedNotification;
}

export interface AddPriorityNotificationItemAction {
	type: ActionTypes.addPriorityNotificationItem;
	payload: Organisms.Notifications.HookSignedNotification;
}

export interface ClearNotificationItemsByIdAction {
	type: ActionTypes.clearNotificationItemsById;
	payload: string;
}
