import { User } from '@domain/entities';

export interface IResetUserPassword {
	exec: (params: IResetUserPassword.Params) => IResetUserPassword.Result;
}

export namespace IResetUserPassword {
	export type Params = Pick<User, 'email'>;
	export type Result = Promise<void>;
}
