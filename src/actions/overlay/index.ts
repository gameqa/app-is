import { HookSignedNotification } from "../../components/organisms/Notifications";
import { OverlayItem, OverlayType } from "../../declerations";
import { ActionTypes } from "../types";
import { EnqueOverlayAction, DequeOverlayAction } from "./interface";

export const enqueOverlay = (
	payload: OverlayType
): EnqueOverlayAction => ({
	type: ActionTypes.enqueOverlay,
	payload,
});

export const setPriorityNotificationItem = (
	payload: HookSignedNotification
) => ({
	type: ActionTypes.addPriorityNotificationItem,
	payload,
});

export * as Actions from "./interface";
