import { Session } from '@domain/entities';

export interface IRefreshSession {
	exec: (params: IRefreshSession.Params) => IRefreshSession.Result;
}

export namespace IRefreshSession {
	export type Params = { refreshToken: Session['_refreshToken'] };
	export type Result = Promise<{ accessToken: string }>;
}
