import { Session, SessionMetadata, User } from '@domain/entities';

export interface ICreateSession {
	exec: (params: ICreateSession.Params) => ICreateSession.Result;
}

export namespace ICreateSession {
	export type Params = { userId: User['id'] } & Pick<SessionMetadata, 'browser' | 'deviceType' | 'ipAddress'>;
	export type Result = Promise<Session>;
}
