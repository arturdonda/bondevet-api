import { User } from '@domain/entities';

export interface IUpdateUser {
	exec: (params: IUpdateUser.Params) => IUpdateUser.Result;
}

export namespace IUpdateUser {
	export type Params = Pick<User, 'id'> & Partial<Pick<User, 'address' | 'email' | 'phone'>>;
	export type Result = Promise<User>;
}
