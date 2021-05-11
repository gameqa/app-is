import { User } from "../../declerations";

export interface State extends User {
	isAuthCodeSubmissionLoading: boolean;
	isAuthCodeRegenerationLoading: boolean;
	isTutorialCompletedLoading: boolean;
	authCodeErrorMessage: string;
	invites: User[];
}
