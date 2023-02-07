import { IDeleteSession } from '@domain/use-cases/session';
import { IDatabase } from '@application/protocols/database';

export class DeleteSession implements IDeleteSession {
	constructor(private readonly sessionRepository: IDatabase.Repositories.Session) {}

	async exec({ refreshToken }: IDeleteSession.Params): IDeleteSession.Result {
		await this.sessionRepository.delete({ refreshToken });
	}
}
