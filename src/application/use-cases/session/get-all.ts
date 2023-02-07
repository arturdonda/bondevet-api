import { Session } from '@domain/entities';
import { IGetAllSessions } from '@domain/use-cases/session';
import { IDatabase } from '@application/protocols/database';
import { parsePageParams } from '@application/helpers';

export class GetAllSessions implements IGetAllSessions {
	constructor(private readonly sessionRepository: IDatabase.Repositories.Session) {}

	async exec(params: IGetAllSessions.Params): IGetAllSessions.Result {
		const pageParams = parsePageParams(params);

		return this.sessionRepository.getAll({
			...params,
			...pageParams,
			sortBy: 'metadata.date' as keyof Session,
			sortDirection: 'DESC',
		});
	}
}
