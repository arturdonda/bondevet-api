import { IResetPassword } from '@domain/use-cases/auth';
import { validatePassword } from '@domain/helpers';
import { NotFoundError } from '@application/errors';
import { IDatabase } from '@application/protocols/database';
import { IHashService, ITokenService } from '@application/protocols/services';

export class ResetPassword implements IResetPassword {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly hashService: IHashService,
		private readonly tokenService: ITokenService
	) {}

	async exec({ resetToken, password }: IResetPassword.Params): IResetPassword.Result {
		const { id } = this.tokenService.decode({ token: resetToken, type: 'OTHER' }) as ResetToken;

		const user = await this.userRepository.getOne({ id });

		if (!user) throw new NotFoundError('User');

		user.password = this.hashService.hash(validatePassword(password));

		await this.userRepository.update(user);
	}
}

type ResetToken = { id: string };
