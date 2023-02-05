import { User } from '@domain/entities';
import { ICreateUser } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { IUuidService } from '@application/protocols/services';

export class CreateUser implements ICreateUser {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly uuidService: IUuidService
	) {}

	exec(params: ICreateUser.Params): ICreateUser.Result {
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
