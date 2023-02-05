export class InvalidPasswordError extends Error {
	public readonly userError: boolean;

	constructor() {
		super('Invalid password.');
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
