import { Page, User } from '@domain/entities';
import { AddressViewModel } from '@presentation/view-models';

export class UserViewModel {
	private readonly id: string;
	private readonly firstName: string;
	private readonly lastName: string;
	private readonly cpf: string | undefined;
	private readonly rg: string | undefined;
	private readonly phone: string;
	private readonly email: string;
	private readonly birthday: string;
	private readonly address: AddressViewModel | undefined;
	private readonly createdAt: string | undefined;
	private readonly updatedAt: string | undefined;
	private readonly deletedAt: string | undefined;

	constructor(params: User, fullInfo: boolean) {
		this.id = params.id;
		this.firstName = params.firstName;
		this.lastName = params.lastName;
		this.cpf = fullInfo ? params.cpf : undefined;
		this.rg = fullInfo ? params.rg : undefined;
		this.phone = params.phone;
		this.email = params.email;
		this.birthday = params.birthday;
		this.address = fullInfo ? AddressViewModel.map(params.address) : undefined;
		this.createdAt = fullInfo ? params.createdAt.toISOString() : undefined;
		this.updatedAt = fullInfo ? params.updatedAt.toISOString() : undefined;
		this.deletedAt = fullInfo && params.deletedAt ? params.deletedAt.toISOString() : undefined;
	}

	static map(user: User, fullInfo?: boolean): UserViewModel {
		return new UserViewModel(user, !!fullInfo);
	}

	static mapPage(userPage: Page<User>): Page<UserViewModel> {
		return { ...userPage, data: userPage.data.map(user => UserViewModel.map(user, false)) };
	}
}
