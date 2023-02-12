import { User } from '@domain/entities';
import { ICreateUser } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { IUuidService } from '@application/protocols/services';
import { UserRegisteredError } from '@application/errors';

export class CreateUser implements ICreateUser {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly uuidService: IUuidService
	) {}

	async exec(params: ICreateUser.Params): ICreateUser.Result {
		if (await this.userRepository.getOne({ cpf: params.cpf })) throw new UserRegisteredError('CPF');
		if (await this.userRepository.getOne({ rg: params.rg })) throw new UserRegisteredError('RG');
		if (await this.userRepository.getOne({ phone: params.phone })) throw new UserRegisteredError('Phone');
		if (await this.userRepository.getOne({ email: params.email })) throw new UserRegisteredError('Email');

		const user = new User({
			id: this.uuidService.generate(),
			firstName: params.firstName,
			lastName: params.lastName,
			cpf: params.cpf,
			rg: params.rg,
			phone: params.phone,
			email: params.email,
			password: params.password,
			birthday: params.birthday,
			address: params.address,
		});

		return this.userRepository.create(user);
	}
}
