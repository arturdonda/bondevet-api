import { ILoginUser } from '@domain/use-cases/user';
import { ICreateSession, IRefreshSession } from '@domain/use-cases/session';
import { IDatabase } from '@application/protocols/database';
import { IHashService } from '@application/protocols/services';
import { InvalidPasswordError, NotFoundError } from '@application/errors';

export class LoginUser implements ILoginUser {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly hashService: IHashService,
		private readonly createSession: ICreateSession,
		private readonly refreshSession: IRefreshSession
	) {}

	async exec({ email, password }: ILoginUser.Params): ILoginUser.Result {
		const user = await this.userRepository.getOne({ email });

		if (!user) throw new NotFoundError('User');
		if (!this.hashService.verify({ text: password, hash: user.password })) throw new InvalidPasswordError();

		const { refreshToken } = await this.createSession.exec({ userId: user.id });

		const { accessToken } = await this.refreshSession.exec({ refreshToken });

		return { user, refreshToken, accessToken };
	}
}
