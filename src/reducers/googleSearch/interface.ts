import { ArticlePreview } from "../../declerations";

export interface State {
	articles: ArticlePreview[];
	query: string;
	searchError: boolean;
	noResults: boolean;
	isLoading: boolean;
}
