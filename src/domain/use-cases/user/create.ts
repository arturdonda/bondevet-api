import { User, UserParams } from '@domain/entities';

export interface ICreateUser {
	exec: (params: ICreateUser.Params) => ICreateUser.Result;
}

export namespace ICreateUser {
	export type Params = Omit<UserParams, 'id'>;
	export type Result = Promise<User>;
}
