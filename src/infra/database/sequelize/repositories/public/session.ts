import { NotFoundError } from '@application/errors';
import { ISessionRepository } from '@application/protocols/database/repositories';
import { SessionDTO } from '@infra/database/sequelize/dtos/public';
import { ModelStatic, Model, WhereOptions, Order, Op } from 'sequelize';

export class SessionRepository implements ISessionRepository {
	constructor(private readonly sessions: ModelStatic<Model>) {}

	getAll(params: ISessionRepository.GetAll.Params): ISessionRepository.GetAll.Result {
		return this.sessions
			.findAndCountAll({
				where: this.makeGetAllFilters(params),
				order: this.makeGetAllOrder(params),
				offset: this.makeGetAllOffset(params),
				limit: this.makeGetAllLimit(params),
			})
			.then(result => ({
				pageSize: params.pageSize,
				pageNumber: params.pageNumber,
				totalCount: result.count,
				data: SessionDTO.multiple(result.rows),
			}));
	}

	getOne(params: ISessionRepository.GetOne.Params): ISessionRepository.GetOne.Result {
		return this.sessions.findOne({ where: params }).then(session => (session ? SessionDTO.single(session) : null));
	}

	getUser(refreshToken: ISessionRepository.GetUser.Params): ISessionRepository.GetUser.Result {
		return this.sessions.findOne({ where: refreshToken, attributes: ['userId'] }).then(result => {
			if (result === null) return null;

			return result.get().userId;
		});
	}

	create(params: ISessionRepository.Create.Params): ISessionRepository.Create.Result {
		return this.sessions
			.create({
				refreshToken: params.refreshToken,
				csfr: params.csfr,
				userId: params.userId,
				metadata: params.metadata,
			})
			.then(session => SessionDTO.single(session));
	}

	update(params: ISessionRepository.Update.Params): ISessionRepository.Update.Result {
		return this.sessions
			.update(
				{ metadata: params.metadata },
				{
					where: { refreshToken: params.refreshToken },
					returning: true,
				}
			)
			.then(([affectedCount, affectedRows]) => {
				if (affectedCount === 0) throw new NotFoundError('Session');

				return SessionDTO.single(affectedRows[0]);
			});
	}

	delete(refreshToken: ISessionRepository.Delete.Params): ISessionRepository.Delete.Result {
		return this.sessions.destroy({ where: refreshToken }).then(() => {});
	}

	private makeGetAllFilters = (params: ISessionRepository.GetAll.Params): WhereOptions | undefined => {
		return { userId: params.userId };
	};

	private makeGetAllOrder(params: ISessionRepository.GetAll.Params): Order | undefined {
		if (!params.sortBy || !params.sortDirection) return undefined;

		const order: Order = [];
		order.push([params.sortBy, params.sortDirection]);
		order.push(['metadata.date', 'DESC']);

		return order;
	}

	private makeGetAllOffset(params: ISessionRepository.GetAll.Params): number | undefined {
		if (params.pageNumber === undefined || params.pageNumber <= 0) return undefined;
		if (params.pageSize === undefined || params.pageSize <= 0) return undefined;

		return (params.pageNumber - 1) * params.pageSize;
	}

	private makeGetAllLimit(params: ISessionRepository.GetAll.Params): number | undefined {
		if (params.pageSize === undefined || params.pageSize <= 0) return undefined;

		return params.pageSize;
	}
}
