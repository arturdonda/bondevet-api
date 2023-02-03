import { User } from '@domain/entities';

export interface IGetUserById {
	exec: (params: IGetUserById.Params) => IGetUserById.Result;
}

export namespace IGetUserById {
	export type Params = Pick<User, 'id'>;
	export type Result = Promise<User>;
}
