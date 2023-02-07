import { Session } from '@domain/entities';
import { ICreateSession } from '@domain/use-cases/session';
import { IDatabase } from '@application/protocols/database';
import { IRandomService, IIpService } from '@application/protocols/services';

export class CreateSession implements ICreateSession {
	constructor(
		private readonly sessionRepository: IDatabase.Repositories.Session,
		private readonly randomService: IRandomService,
		private readonly ipService: IIpService
	) {}

	async exec({ browser, deviceType, ipAddress, userId }: ICreateSession.Params): ICreateSession.Result {
		const { country, region, city } = await this.ipService.lookup(ipAddress);

		const session = new Session({
			userId,
			refreshToken: this.randomService.string({ length: 32 }),
			csrf: this.randomService.string({ length: 32 }),
			metadata: {
				ipAddress,
				deviceType,
				browser,
				country,
				region,
				city,
				date: new Date(),
			},
		});

		return this.sessionRepository.create(session);
	}
}
