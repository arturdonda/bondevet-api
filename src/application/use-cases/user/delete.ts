import { IDeleteUser } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { NotFoundError } from '@application/errors';

export class DeleteUser implements IDeleteUser {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly sessionRepository: IDatabase.Repositories.Session
	) {}

	async exec({ id }: IDeleteUser.Params): IDeleteUser.Result {
		const user = await this.userRepository.getOne({ id });

		if (!user) throw new NotFoundError('User');

		user.setDeleted();

		await this.userRepository.update(user);

		await this.sessionRepository.deleteAll({ userId: user.id });
	}
}
