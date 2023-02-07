import { Address, Page, PageParams, User } from '@domain/entities';

export interface IGetAllUsers {
	exec: (params?: IGetAllUsers.Params) => IGetAllUsers.Result;
}

export namespace IGetAllUsers {
	export type Params = Partial<PageParams<User>> &
		Partial<
			Pick<User, 'cpf' | 'email' | 'phone' | 'rg'> & {
				birthdayFrom: Date;
				birthdayTo: Date;
				name: string;
			} & Pick<Address, 'city' | 'state' | 'neighborhood'>
		>;
	export type Result = Promise<Page<User>>;
}
