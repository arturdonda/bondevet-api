import { Session } from '@domain/entities';
import { ICreateSession } from '@domain/use-cases/session';
import { IDatabase } from '@application/protocols/database';
import { IRandomService } from '@application/protocols/services';

export class CreateSession implements ICreateSession {
	constructor(
		private readonly sessionRepository: IDatabase.Repositories.Session,
		private readonly randomService: IRandomService
	) {}

	async exec({ userId }: ICreateSession.Params): ICreateSession.Result {
		const session = new Session({
			userId,
			refreshToken: this.randomService.string({ length: 32 }),
			csrf: this.randomService.string({ length: 32 }),
		});

		return this.sessionRepository.create(session);
	}
}
