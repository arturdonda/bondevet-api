import { ISessionRepository } from '@application/protocols/database/repositories';
import { SessionDTO } from '@infra/database/sequelize/dtos/public';
import { ModelStatic, Model } from 'sequelize';

export class SessionRepository implements ISessionRepository {
	constructor(private readonly sessions: ModelStatic<Model>) {}

	getOne(params: ISessionRepository.GetOne.Params): ISessionRepository.GetOne.Result {
		return this.sessions.findOne({ where: params }).then(session => (session ? SessionDTO.single(session) : null));
	}

	create(params: ISessionRepository.Create.Params): ISessionRepository.Create.Result {
		return this.sessions
			.create({
				refreshToken: params.refreshToken,
				csfr: params.csfr,
				userId: params.userId,
			})
			.then(session => SessionDTO.single(session));
	}
}
