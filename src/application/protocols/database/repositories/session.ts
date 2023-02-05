import { Session } from '@domain/entities';

export interface ISessionRepository {
	getOne: (params: ISessionRepository.GetOne.Params) => ISessionRepository.GetOne.Result;
	create: (params: ISessionRepository.Create.Params) => ISessionRepository.Create.Result;
}

export namespace ISessionRepository {
	export namespace GetOne {
		export type Params = Pick<Session, 'refreshToken'>;
		export type Result = Promise<Session | null>;
	}
	export namespace Create {
		export type Params = Session;
		export type Result = Promise<Session>;
	}
}
