import { IUpdateUser } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { NotFoundError, UserRegisteredError } from '@application/errors';

export class UpdateUser implements IUpdateUser {
	constructor(private readonly userRepository: IDatabase.Repositories.User) {}

	async exec({ id, email, address, phone }: IUpdateUser.Params): IUpdateUser.Result {
		const user = await this.userRepository.getOne({ id });

		if (!user) throw new NotFoundError('User');

		if (email) {
			if (await this.userRepository.getOne({ email, includeDeleted: true })) throw new UserRegisteredError('email');

			user.email = email;
		}

		if (phone) {
			if (await this.userRepository.getOne({ phone, includeDeleted: true })) throw new UserRegisteredError('phone');

			user.phone = phone;
		}

		if (address) {
			user.address = address;
		}

		return this.userRepository.update(user);
	}
}
