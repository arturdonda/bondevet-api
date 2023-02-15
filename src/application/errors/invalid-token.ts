export class InvalidTokenError extends Error {
	public readonly userError: boolean;

	constructor() {
		super();
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
