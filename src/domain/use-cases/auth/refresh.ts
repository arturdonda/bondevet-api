import { Session } from '@domain/entities';

export interface IRefreshSession {
	exec: (params: IRefreshSession.Params) => IRefreshSession.Result;
}

export namespace IRefreshSession {
	export type Params = Pick<Session, 'refreshToken'> &
		Pick<Session['metadata'], 'browser' | 'deviceType' | 'ipAddress'>;
	export type Result = Promise<{ accessToken: string }>;
}
