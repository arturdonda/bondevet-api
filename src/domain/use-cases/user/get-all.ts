import { Page, PageParams, User } from '@domain/entities';

export interface IGetAllUsers {
	exec: (params?: IGetAllUsers.Params) => IGetAllUsers.Result;
}

export namespace IGetAllUsers {
	export type Params = Partial<PageParams<User>>;
	export type Result = Promise<Page<User>>;
}
