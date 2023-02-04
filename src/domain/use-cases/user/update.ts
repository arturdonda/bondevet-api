import { User } from '@domain/entities';

export interface IUpdateUser {
	exec: (params: IUpdateUser.Params) => IUpdateUser.Result;
}

export namespace IUpdateUser {
	export type Params = Pick<User, 'id' | 'address' | 'email' | 'phone'>;
	export type Result = Promise<User>;
}
