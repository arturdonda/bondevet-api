import { IDeleteSession } from '@domain/use-cases/session';
import { IDatabase } from '@application/protocols/database';
import { NotFoundError } from '@application/errors';

export class DeleteSession implements IDeleteSession {
	constructor(private readonly sessionRepository: IDatabase.Repositories.Session) {}

	async exec({ refreshToken, userId }: IDeleteSession.Params): IDeleteSession.Result {
		const session = await this.sessionRepository.getOne({ refreshToken, userId });

		if (!session) throw new NotFoundError('Session');

		await this.sessionRepository.delete({ refreshToken });
	}
}
