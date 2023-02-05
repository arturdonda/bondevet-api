import { Session, User } from '@domain/entities';

export interface ICreateSession {
	exec: (params: ICreateSession.Params) => ICreateSession.Result;
}

export namespace ICreateSession {
	export type Params = { userId: User['_id'] };
	export type Result = Promise<Session>;
}