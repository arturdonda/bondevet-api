export class InvalidParamError extends Error {
	public readonly userError: boolean;
	public readonly param: string;

	constructor(param: string, message: string) {
		super(`Invalid parameter '${param}': ${message}.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.param = param;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
