import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";

export const initialState: State = {
	priority: undefined,
	list: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.addNotificationItem:
			return {
				...state,
				list: [...state.list, action.payload],
			};
		case ActionTypes.addPriorityNotificationItem:
			return {
				...state,
				priority: action.payload,
			};
		case ActionTypes.clearNotificationItemsById:
			return {
				...state,
				priority: action.payload === state.priority?.id ? undefined : state.priority,
				list: state.list.filter((item) => item.id !== action.payload),
			};
		case ActionTypes.clearNotificationsByHookId:
			return {
				...state,
				priority:
					action.payload === state.priority?.hookId ? undefined : state.priority,
				list: state.list.filter((item) => item.hookId !== action.payload),
			};
		default:
			return state;
	}
};

export default reducer;

export * from "./interface";
