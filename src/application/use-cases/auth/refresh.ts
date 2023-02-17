import { IRefreshSession } from '@domain/use-cases/auth';
import { NotFoundError } from '@application/errors';
import { IDatabase } from '@application/protocols/database';
import { ITokenService, IIpService } from '@application/protocols/services';

export class RefreshSession implements IRefreshSession {
	constructor(
		private readonly sessionRepository: IDatabase.Repositories.Session,
		private readonly tokenService: ITokenService,
		private readonly ipService: IIpService
	) {}

	async exec({ browser, deviceType, ipAddress, refreshToken }: IRefreshSession.Params): IRefreshSession.Result {
		const session = await this.sessionRepository.getOne({ refreshToken });

		if (!session) throw new NotFoundError('Session');

		const accessToken = this.tokenService.encode({
			payload: { userId: session.userId },
			type: 'ACCESS_TOKEN',
			expiresIn: '15m',
		});

		const { country, region, city } = await this.ipService.lookup(ipAddress);

		session.metadata = {
			ipAddress,
			deviceType,
			browser,
			country,
			region,
			city,
			date: new Date(),
		};

		await this.sessionRepository.update(session);

		return { accessToken };
	}
}
