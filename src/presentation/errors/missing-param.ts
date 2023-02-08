export class MissingParamError extends Error {
	public readonly userError: boolean;

	constructor(paramName: string) {
		super(`Parameter  '${paramName}' is required.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
