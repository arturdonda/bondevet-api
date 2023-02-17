export class Session {
	private _refreshToken: string;
	private _csrf: string;
	private _userId: string;
	private _metadata: SessionMetadata;

	constructor(params: SessionParams) {
		this._refreshToken = params.refreshToken;
		this._csrf = params.csrf;
		this._userId = params.userId;
		this._metadata = params.metadata;
	}

	//#region Methods
	isCsrfValid(csrf: string) {
		return this._csrf === csrf;
	}
	//#endregion Methods

	//#region Getters
	get refreshToken(): SessionParams['refreshToken'] {
		return this._refreshToken;
	}

	get csrf(): SessionParams['csrf'] {
		return this._csrf;
	}

	get userId(): SessionParams['userId'] {
		return this._userId;
	}

	get metadata(): SessionParams['metadata'] {
		return this._metadata;
	}
	//#endregion Getters

	//#region Setters
	set metadata(metadata: SessionMetadata) {
		this._metadata = metadata;
	}
	//#endregion Setters
}

export type SessionParams = {
	refreshToken: string;
	csrf: string;
	userId: string;
	metadata: SessionMetadata;
};

export type SessionMetadata = {
	ipAddress: string;
	country: { code: string; name: string };
	region: { code: string; name: string };
	city: string;
	deviceType: 'mobile' | 'tablet' | 'desktop';
	browser: string;
	date: Date;
};
