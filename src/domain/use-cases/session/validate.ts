import { Session } from '@domain/entities';

export interface IValidateSession {
	exec: (params: IValidateSession.Params) => IValidateSession.Result;
}

export namespace IValidateSession {
	export type Params = Pick<Session, 'refreshToken'>;
	export type Result = Promise<Pick<Session, 'userId'>>;
}
