import { Session, SessionMetadata } from '@domain/entities';

export interface ICreateSession {
	exec: (params: ICreateSession.Params) => ICreateSession.Result;
}

export namespace ICreateSession {
	export type Params = Pick<SessionMetadata, 'browser' | 'deviceType' | 'ipAddress'> & Pick<Session, 'userId'>;
	export type Result = Promise<Session>;
}
