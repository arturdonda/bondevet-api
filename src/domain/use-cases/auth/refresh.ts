import { Session, SessionMetadata } from '@domain/entities';

export interface IRefreshSession {
	exec: (params: IRefreshSession.Params) => IRefreshSession.Result;
}

export namespace IRefreshSession {
	export type Params = Pick<Session, 'refreshToken' | 'userId'> &
		Pick<SessionMetadata, 'browser' | 'deviceType' | 'ipAddress'>;
	export type Result = Promise<{ accessToken: string }>;
}
