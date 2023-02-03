import { User } from '@domain/entities';

export interface IDeleteUser {
	exec: (params: IDeleteUser.Params) => IDeleteUser.Result;
}

export namespace IDeleteUser {
	export type Params = Pick<User, 'id'>;
	export type Result = Promise<void>;
}
