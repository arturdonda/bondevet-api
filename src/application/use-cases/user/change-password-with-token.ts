import { IChangeUserPasswordWithToken } from '@domain/use-cases/user';
import { NotFoundError } from '@application/errors';
import { IDatabase } from '@application/protocols/database';
import { IHashService, ITokenService } from '@application/protocols/services';

export class ChangeUserPasswordWithToken implements IChangeUserPasswordWithToken {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly hashService: IHashService,
		private readonly tokenService: ITokenService
	) {}

	async exec({ resetToken, password }: IChangeUserPasswordWithToken.Params): IChangeUserPasswordWithToken.Result {
		const { id } = this.tokenService.decode({ token: resetToken, type: 'OTHER' }) as ResetToken;

		const user = await this.userRepository.getOne({ id });

		if (!user) throw new NotFoundError('User');

		user.password = this.hashService.hash(password);

		await this.userRepository.update(user);
	}
}

type ResetToken = { id: string };
