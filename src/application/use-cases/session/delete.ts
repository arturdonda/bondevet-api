import { IDeleteSession } from '@domain/use-cases/session';
import { IDatabase } from '@application/protocols/database';
import { NotFoundError } from '@application/errors';

export class DeleteSession implements IDeleteSession {
	constructor(private readonly sessionRepository: IDatabase.Repositories.Session) {}

	async exec({ id, userId }: IDeleteSession.Params): IDeleteSession.Result {
		const session = await this.sessionRepository.getOne({ id });

		if (session?.userId !== userId) throw new NotFoundError('Session');

		await this.sessionRepository.delete({ refreshToken: session.refreshToken });
	}
}
