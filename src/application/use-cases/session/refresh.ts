import { NotFoundError } from '@application/errors';
import { IDatabase } from '@application/protocols/database';
import { ITokenService } from '@application/protocols/services';
import { IRefreshSession } from '@domain/use-cases/session';

export class RefreshSession implements IRefreshSession {
	constructor(
		private readonly sessionRepository: IDatabase.Repositories.Session,
		private readonly tokenService: ITokenService
	) {}

	async exec({ refreshToken }: IRefreshSession.Params): IRefreshSession.Result {
		const session = await this.sessionRepository.getOne({ refreshToken });

		if (!session) throw new NotFoundError('Session');

		const token = this.tokenService.encode({ payload: { user: session.userId }, type: 'ACCESS_TOKEN' });

		return { accessToken: token };
	}
}
