import { ActionTypes } from "../types";
import {
	FetchArticlesQueryAction,
	WriteGoogleQueryAction,
	SetSearchErrorAction,
} from "./interface";
import { Dispatch } from "redux";
import Api from "../../api";
import { Game } from "../";
import store from "../../../store";
import { ArticlePreview } from "../../declerations";

export const writeGoogleQuery = (user: string): WriteGoogleQueryAction => {
	return {
		type: ActionTypes.writeGoogleQuery,
		payload: user,
	};
};

export const fetchArticlesQuery = () => {
	return async function (dispatch: Dispatch) {
		try {
			dispatch<Game.Actions.SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: true,
			});
			const { data } = await Api.get<ArticlePreview[]>(
				`/api/v1/articles?query=${store.getState().googleSearch.query}`
			);

			dispatch<FetchArticlesQueryAction>({
				type: ActionTypes.fetchArticlesQuery,
				payload: data.filter((item) => !!item.source),
			});
		} catch (error) {
			dispatch<SetSearchErrorAction>({
				type: ActionTypes.setGoogleSearchError,
			});
		} finally {
			dispatch<Game.Actions.SetGameLoadingStateAction>({
				type: ActionTypes.setGameLoadingState,
				payload: false,
			});
		}
	};
};

export * as Actions from "./interface";
