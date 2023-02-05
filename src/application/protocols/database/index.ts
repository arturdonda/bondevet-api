import { ISessionRepository, IUserRepository } from '@application/protocols/database/repositories';

export interface IDatabase {
	connect: (params: IDatabase.Connect.Params) => IDatabase.Connect.Result;
	disconnect: () => IDatabase.Disconnect.Result;
	repositories: {
		Session: ISessionRepository;
		User: IUserRepository;
	};
}

export namespace IDatabase {
	export namespace Connect {
		export type Params = string;
		export type Result = Promise<void>;
	}
	export namespace Disconnect {
		export type Result = Promise<void>;
	}
	export namespace Repositories {
		export type User = IUserRepository;
		export type Session = ISessionRepository;
	}
}
