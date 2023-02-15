import { User } from '@domain/entities';

export interface IForgotPassword {
	exec: (params: IForgotPassword.Params) => IForgotPassword.Result;
}

export namespace IForgotPassword {
	export type Params = Pick<User, 'email'>;
	export type Result = Promise<void>;
}
