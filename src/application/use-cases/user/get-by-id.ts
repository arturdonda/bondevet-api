import { IGetUserById } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { NotFoundError } from '@application/errors';

export class GetUserById implements IGetUserById {
	constructor(private readonly userRepository: IDatabase.Repositories.User) {}

	async exec({ id }: IGetUserById.Params): IGetUserById.Result {
		const user = await this.userRepository.getOne({ id });

		if (!user) throw new NotFoundError('User');

		return user;
	}
}
