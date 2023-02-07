import { Page, PageParams, Session, User } from '@domain/entities';

export interface ISessionRepository {
	getAll: (params: ISessionRepository.GetAll.Params) => ISessionRepository.GetAll.Result;
	getOne: (params: ISessionRepository.GetOne.Params) => ISessionRepository.GetOne.Result;
	create: (params: ISessionRepository.Create.Params) => ISessionRepository.Create.Result;
	update: (params: ISessionRepository.Update.Params) => ISessionRepository.Update.Result;
}

export namespace ISessionRepository {
	export namespace GetAll {
		export type Params = PageParams<Session> & { userId: User['id'] };
		export type Result = Promise<Page<Session>>;
	}
	export namespace GetOne {
		export type Params = Pick<Session, 'refreshToken'>;
		export type Result = Promise<Session | null>;
	}
	export namespace Create {
		export type Params = Session;
		export type Result = Promise<Session>;
	}
	export namespace Update {
		export type Params = Session;
		export type Result = Promise<Session>;
	}
}
