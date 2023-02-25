import { Session, SessionMetadata } from '@domain/entities';

export interface ICreateSession {
	exec: (params: ICreateSession.Params) => ICreateSession.Result;
}

export namespace ICreateSession {
	export type Params = Pick<Session, 'userId'> & Pick<SessionMetadata, 'browser' | 'deviceType' | 'ipAddress'>;
	export type Result = Promise<Session>;
}
