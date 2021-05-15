import { HookSignedNotification } from "../../components/organisms/Notifications/interface";

export interface State {
	priority?: HookSignedNotification;
	list: HookSignedNotification[];
}
