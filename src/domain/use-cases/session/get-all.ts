import { Page, PageParams, Session } from '@domain/entities';

export interface IGetAllSessions {
	exec: (params: IGetAllSessions.Params) => IGetAllSessions.Result;
}

export namespace IGetAllSessions {
	export type Params = Partial<PageParams<Session>> & Pick<Session, 'userId'>;
	export type Result = Promise<Page<Session>>;
}
