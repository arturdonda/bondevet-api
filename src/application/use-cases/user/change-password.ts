import { IChangeUserPassword } from '@domain/use-cases/user';
import { NotFoundError } from '@application/errors';
import { IDatabase } from '@application/protocols/database';
import { IHashService } from '@application/protocols/services';

export class ChangeUserPassword implements IChangeUserPassword {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly hashService: IHashService
	) {}

	async exec({ id, password }: IChangeUserPassword.Params): IChangeUserPassword.Result {
		const user = await this.userRepository.getOne({ id });

		if (!user) throw new NotFoundError('User');

		user.password = this.hashService.hash(password);

		await this.userRepository.update(user);
	}
}
