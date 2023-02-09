import { Session } from '@domain/entities';

export interface IDeleteSession {
	exec: (params: IDeleteSession.Params) => IDeleteSession.Result;
}

export namespace IDeleteSession {
	export type Params = Pick<Session, 'refreshToken' | 'userId'>;
	export type Result = Promise<void>;
}
