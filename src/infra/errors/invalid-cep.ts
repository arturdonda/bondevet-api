export class InvalidCepError extends Error {
	public readonly userError: boolean;

	constructor(message: string) {
		super(`Invalid CEP: ${message}.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
