import { User } from '@domain/entities';

export interface IChangeUserPassword {
	exec: (params: IChangeUserPassword.Params) => IChangeUserPassword.Result;
}

export namespace IChangeUserPassword {
	export type Params = Pick<User, 'id' | 'password'>;
	export type Result = Promise<void>;
}
