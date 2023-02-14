import { User } from '@domain/entities';

export interface IChangeUserPasswordWithToken {
	exec: (params: IChangeUserPasswordWithToken.Params) => IChangeUserPasswordWithToken.Result;
}

export namespace IChangeUserPasswordWithToken {
	export type Params = Pick<User, 'password'> & { resetToken: string };
	export type Result = Promise<void>;
}
