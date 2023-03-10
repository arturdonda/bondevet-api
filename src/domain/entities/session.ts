export class Session {
	private _id: string;
	private _refreshToken: string;
	private _csrf: string;
	private _userId: string;
	private _metadata: SessionParams['metadata'];

	constructor(params: SessionParams) {
		this._id = params.id;
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
	get id(): SessionParams['id'] {
		return this._id;
	}

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
	set metadata(metadata: SessionParams['metadata']) {
		this._metadata = metadata;
	}
	//#endregion Setters
}

type SessionParams = {
	id: string;
	refreshToken: string;
	csrf: string;
	userId: string;
	metadata: {
		ipAddress: string;
		country: { code: string; name: string };
		region: { code: string; name: string };
		city: string;
		deviceType: 'mobile' | 'tablet' | 'desktop';
		browser: string;
		date: Date;
	};
};
