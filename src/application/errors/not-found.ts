export class NotFoundError extends Error {
	public readonly userError: boolean;

	constructor(objectName: string) {
		super(`${objectName} not found.`);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.userError = true;

		Error.captureStackTrace(this);
	}
}
