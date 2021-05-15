type NotiType = "important" | "standard";

export interface Notification {
	type: NotiType;
	readonly title: string;
	description: string;
}

export interface HookSignedNotification extends Notification {
	id: string;
}
