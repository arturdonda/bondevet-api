import { User } from '@domain/entities';

export interface ILoginUser {
	exec: (params: ILoginUser.Params) => ILoginUser.Result;
}

export namespace ILoginUser {
	export type Params = Pick<User, 'email' | 'password'>;
	export type Result = Promise<{ user: User; accessToken: string; refreshToken: string }>;
}
