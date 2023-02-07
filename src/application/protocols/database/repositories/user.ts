import { Address, Page, PageParams, User } from '@domain/entities';
import { Choose } from '@application/protocols/utility-types';

export interface IUserRepository {
	getAll: (params: IUserRepository.GetAll.Params) => IUserRepository.GetAll.Result;
	getOne: (params: IUserRepository.GetOne.Params) => IUserRepository.GetOne.Result;
	create: (params: IUserRepository.Create.Params) => IUserRepository.Create.Result;
	update: (params: IUserRepository.Update.Params) => IUserRepository.Update.Result;
}

export namespace IUserRepository {
	export namespace GetAll {
		export type Params = PageParams<User> &
			Partial<
				Pick<User, 'cpf' | 'email' | 'phone' | 'rg'> & {
					birthdayFrom: Date;
					birthdayTo: Date;
					name: string;
				} & Pick<Address, 'city' | 'state' | 'neighborhood'>
			>;
		export type Result = Promise<Page<User>>;
	}
	export namespace GetOne {
		export type Params = Choose<User, 'id', 'email'>;
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
}
