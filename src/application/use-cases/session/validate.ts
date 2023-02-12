import { NotFoundError } from '@application/errors';
import { IDatabase } from '@application/protocols/database';
import { IValidateSession } from '@domain/use-cases/session';

export class ValidateSession implements IValidateSession {
	constructor(private readonly sessionRepository: IDatabase.Repositories.Session) {}

	async exec({ refreshToken }: IValidateSession.Params): IValidateSession.Result {
		const userId = await this.sessionRepository.getUser({ refreshToken });

		if (!userId) throw new NotFoundError('Session');

		return userId;
	}
}
