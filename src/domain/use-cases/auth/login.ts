import { Session, User } from '@domain/entities';

export interface ILogin {
	exec: (params: ILogin.Params) => ILogin.Result;
}

export namespace ILogin {
	export type Params = Pick<User, 'email' | 'password'> &
		Pick<Session['metadata'], 'browser' | 'deviceType' | 'ipAddress'>;
	export type Result = Promise<{ user: User; accessToken: string; refreshToken: string }>;
}
