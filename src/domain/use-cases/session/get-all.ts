import { Page, PageParams, Session, User } from '@domain/entities';

export interface IGetAllSessions {
	exec: (params: IGetAllSessions.Params) => IGetAllSessions.Result;
}

export namespace IGetAllSessions {
	export type Params = Partial<PageParams<Session>> & { userId: User['id'] };
	export type Result = Promise<Page<Session>>;
}
