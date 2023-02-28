import { IUserRepository } from '@application/protocols/database/repositories';
import { NotFoundError } from '@application/errors';
import { UserDTO } from '@infra/database/sequelize/dtos/public';
import { ModelStatic, Model, WhereOptions, Op, Order } from 'sequelize';

export class UserRepository implements IUserRepository {
	constructor(private readonly users: ModelStatic<Model>) {}

	getAll(params: IUserRepository.GetAll.Params): IUserRepository.GetAll.Result {
		return this.users
			.findAndCountAll({
				where: this.makeWhereClause(params),
				order: this.makeOrderClause(params),
				offset: this.makeOffsetClause(params),
				limit: this.makeLimitClause(params),
			})
			.then(result => ({
				pageSize: params.pageSize,
				pageNumber: params.pageNumber,
				totalCount: result.count,
				data: UserDTO.multiple(result.rows),
			}));
	}

	getOne(params: IUserRepository.GetOne.Params): IUserRepository.GetOne.Result {
		return this.users
			.findOne({ where: this.makeWhereClause(params) })
			.then(user => (user ? UserDTO.single(user) : null));
	}

	create(user: IUserRepository.Create.Params): IUserRepository.Create.Result {
		return this.users
			.create({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				cpf: user.cpf,
				rg: user.rg,
				phone: user.phone,
				email: user.email,
				password: user.password,
				birthday: user.birthday,
				address: user.address,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				deletedAt: user.deletedAt,
			})
			.then(user => UserDTO.single(user));
	}

	update(user: IUserRepository.Update.Params): IUserRepository.Update.Result {
		return this.users
			.update(
				{
					phone: user.phone,
					email: user.email,
					password: user.password,
					address: user.address,
					updatedAt: user.updatedAt,
					deletedAt: user.deletedAt,
				},
				{ where: { id: user.id }, returning: true }
			)
			.then(([affectedCount, affectedRows]) => {
				if (affectedCount === 0) throw new NotFoundError('User');

				return UserDTO.single(affectedRows[0]);
			});
	}

	//#region Clauses
	private makeWhereClause = (params: IUserRepository.UserFilters): WhereOptions | undefined => {
		const filters: WhereOptions[] = [];

		if (params.id) filters.push({ id: params.id });
		if (params.cpf) filters.push({ cpf: { [Op.iLike]: `%${params.cpf.replace(/\D/g, '')}%` } });
		if (params.rg) filters.push({ rg: { [Op.iLike]: `%${params.rg.replace(/\W/g, '')}%` } });
		if (params.phone) filters.push({ phone: { [Op.iLike]: `%${params.phone.replace(/\D/g, '')}%` } });
		if (params.email) filters.push({ email: { [Op.iLike]: `%${params.email}%` } });
		if (params.city) filters.push({ 'address.city': { [Op.iLike]: `%${params.city}%` } });
		if (params.state) filters.push({ 'address.state': { [Op.iLike]: `%${params.state}%` } });
		if (params.neighborhood) filters.push({ 'address.neighborhood': { [Op.iLike]: `%${params.neighborhood}%` } });
		if (params.includeDeleted !== true) filters.push({ deletedAt: null });
		if (params.birthday) filters.push({ birthday: { [Op.between]: params.birthday } });
		if (params.name)
			filters.push({
				[Op.or]: [{ firstName: { [Op.iLike]: `%${params.name}%` } }, { lastName: { [Op.iLike]: `%${params.name}%` } }],
			});

		return filters.length === 0 ? undefined : { [Op.and]: filters };
	};

	private makeOrderClause(params: IUserRepository.GetAll.Params): Order | undefined {
		const order: Order = [];

		if (params.sortBy && params.sortDirection) order.push([params.sortBy, params.sortDirection]);

		order.push(['firstName', 'ASC']);
		order.push(['lastName', 'ASC']);

		return order;
	}

	private makeOffsetClause(params: IUserRepository.GetAll.Params): number | undefined {
		if (params.pageNumber === undefined || params.pageNumber <= 0) return undefined;
		if (params.pageSize === undefined || params.pageSize <= 0) return undefined;

		return (params.pageNumber - 1) * params.pageSize;
	}

	private makeLimitClause(params: IUserRepository.GetAll.Params): number | undefined {
		if (params.pageSize === undefined || params.pageSize <= 0) return undefined;

		return params.pageSize;
	}
	//#endregion Clauses
}
