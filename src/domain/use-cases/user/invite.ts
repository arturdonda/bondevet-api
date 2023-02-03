import { User } from '@domain/entities';

export interface IInviteUser {
	exec: (params: IInviteUser.Params) => IInviteUser.Result;
}

export namespace IInviteUser {
	export type Params = Pick<User, 'email'>;
	export type Result = Promise<void>;
}
