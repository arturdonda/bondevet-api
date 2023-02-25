import { User } from '@domain/entities';

export interface ICreateUser {
	exec: (params: ICreateUser.Params) => ICreateUser.Result;
}

export namespace ICreateUser {
	export type Params = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'setDeleted'> & {
		inviteToken: string;
	};
	export type Result = Promise<User>;
}
