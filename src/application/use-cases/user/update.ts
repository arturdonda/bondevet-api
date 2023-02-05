import { IUpdateUser } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { NotFoundError } from '@application/errors';

export class UpdateUser implements IUpdateUser {
	constructor(private readonly userRepository: IDatabase.Repositories.User) {}

	async exec({ id, email, address, phone }: IUpdateUser.Params): IUpdateUser.Result {
		const user = await this.userRepository.getOne({ id });

		if (!user) throw new NotFoundError('User');

		if (email) user.email = email;
		if (address) user.address = address;
		if (phone) user.phone = phone;

		return this.userRepository.update(user);
	}
}
