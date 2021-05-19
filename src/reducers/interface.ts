import * as Auth from "./auth";
import * as Game from "./game";
import * as WriteQuestion from "./writeQuestion";
import * as VerifyQuestion from "./verifyQuestion";
import * as SelectSpan from "./selectSpan";
import * as Notification from "./notification";
import * as GoogleSearch from "./googleSearch";
import * as ArticleReader from "./articleReader";
import * as AuthCode from "./authCode";
import * as ChartData from "./chartData";

export interface StoreState {
	auth: Auth.State;
	game: Game.State;
	writeQuestion: WriteQuestion.State;
	verifyQuestion: VerifyQuestion.State;
	selectSpan: SelectSpan.State;
	notification: Notification.State;
	googleSearch: GoogleSearch.State;
	articleReader: ArticleReader.State;
	authCode: AuthCode.State;
	chartData: ChartData.State;
}
