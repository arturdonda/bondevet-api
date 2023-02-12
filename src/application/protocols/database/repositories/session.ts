import { Page, PageParams, Session, User } from '@domain/entities';

export interface ISessionRepository {
	getAll: (params: ISessionRepository.GetAll.Params) => ISessionRepository.GetAll.Result;
	getOne: (params: ISessionRepository.GetOne.Params) => ISessionRepository.GetOne.Result;
	getUser: (params: ISessionRepository.GetUser.Params) => ISessionRepository.GetUser.Result;
	create: (params: ISessionRepository.Create.Params) => ISessionRepository.Create.Result;
	update: (params: ISessionRepository.Update.Params) => ISessionRepository.Update.Result;
	delete: (params: ISessionRepository.Delete.Params) => ISessionRepository.Delete.Result;
}

export namespace ISessionRepository {
	export namespace GetAll {
		export type Params = PageParams<Session> & { userId: User['id'] };
		export type Result = Promise<Page<Session>>;
	}
	export namespace GetOne {
		export type Params = Pick<Session, 'refreshToken' | 'userId'>;
		export type Result = Promise<Session | null>;
	}
	export namespace GetUser {
		export type Params = Pick<Session, 'refreshToken'>;
		export type Result = Promise<Pick<Session, 'userId'> | null>;
	}
	export namespace Create {
		export type Params = Session;
		export type Result = Promise<Session>;
	}
	export namespace Update {
		export type Params = Session;
		export type Result = Promise<Session>;
	}
	export namespace Delete {
		export type Params = Pick<Session, 'refreshToken'>;
		export type Result = Promise<void>;
	}
}
