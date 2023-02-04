export class Session {
	private _refreshToken: string;
	private _csrf: string;
	private _userId: string;

	constructor(params: SessionParams) {
		this._refreshToken = params.refreshToken;
		this._csrf = params.csrf;
		this._userId = params.userId;
	}

	//#region Methods
	validateCsrf(csrf: string) {
		return this._csrf === csrf;
	}
	//#endregion Methods

	//#region Getters
	get refreshToken(): SessionParams['refreshToken'] {
		return this._refreshToken;
	}

	get csfr(): SessionParams['csrf'] {
		return this._csrf;
	}

	get userId(): SessionParams['userId'] {
		return this._userId;
	}
	//#endregion Getters
}

export type SessionParams = {
	refreshToken: string;
	csrf: string;
	userId: string;
};
