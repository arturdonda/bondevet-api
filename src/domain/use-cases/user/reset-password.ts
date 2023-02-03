export interface IResetUserPassword {
	exec: () => IResetUserPassword.Result;
}

export namespace IResetUserPassword {
	export type Result = Promise<void>;
}
