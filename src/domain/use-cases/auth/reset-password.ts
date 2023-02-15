import { User } from '@domain/entities';

export interface IResetPassword {
	exec: (params: IResetPassword.Params) => IResetPassword.Result;
}

export namespace IResetPassword {
	export type Params = Pick<User, 'password'> & { resetToken: string };
	export type Result = Promise<void>;
}
