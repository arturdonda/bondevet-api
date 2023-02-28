import { Address, Page, PageParams, User } from '@domain/entities';

export interface IUserRepository {
	getAll: (params: IUserRepository.GetAll.Params) => IUserRepository.GetAll.Result;
	getOne: (params: IUserRepository.GetOne.Params) => IUserRepository.GetOne.Result;
	create: (params: IUserRepository.Create.Params) => IUserRepository.Create.Result;
	update: (params: IUserRepository.Update.Params) => IUserRepository.Update.Result;
}

export namespace IUserRepository {
	export namespace GetAll {
		export type Params = PageParams<User> & Omit<UserFilters, 'id'>;
		export type Result = Promise<Page<User>>;
	}
	export namespace GetOne {
		export type Params = Pick<UserFilters, 'id' | 'cpf' | 'rg' | 'phone' | 'email' | 'includeDeleted'>;
		export type Result = Promise<User | null>;
	}
	export namespace Create {
		export type Params = User;
		export type Result = Promise<User>;
	}
	export namespace Update {
		export type Params = User;
		export type Result = Promise<User>;
	}
	export type UserFilters = Partial<
		Pick<User, 'id' | 'cpf' | 'rg' | 'phone' | 'email'> &
			Pick<Address, 'city' | 'state' | 'neighborhood'> & {
				includeDeleted: boolean;
				birthday: [string, string];
				name: string;
			}
	>;
}
