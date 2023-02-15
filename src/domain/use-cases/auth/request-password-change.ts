import { User } from '@domain/entities';

export interface IRequestPasswordChange {
	exec: (params: IRequestPasswordChange.Params) => IRequestPasswordChange.Result;
}

export namespace IRequestPasswordChange {
	export type Params = Pick<User, 'email'>;
	export type Result = Promise<void>;
}
