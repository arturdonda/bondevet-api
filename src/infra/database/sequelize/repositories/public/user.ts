import { IUserRepository } from '@application/protocols/database/repositories';
import { NotFoundError } from '@application/errors';
import { UserDTO } from '@infra/database/sequelize/dtos/public';
import { ModelStatic, Model, WhereOptions, Op, Order } from 'sequelize';

export class UserRepository implements IUserRepository {
	constructor(private readonly users: ModelStatic<Model>) {}

	getAll(params: IUserRepository.GetAll.Params): IUserRepository.GetAll.Result {
		return this.users
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
				data: UserDTO.multiple(result.rows),
			}));
	}

	getOne(params: IUserRepository.GetOne.Params): IUserRepository.GetOne.Result {
		return this.users.findOne({ where: params }).then(user => (user ? UserDTO.single(user) : null));
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
				},
				{ where: { id: user.id }, returning: true }
			)
			.then(([affectedCount, affectedRows]) => {
				if (affectedCount === 0) throw new NotFoundError('User');

				return UserDTO.single(affectedRows[0]);
			});
	}

	private makeGetAllFilters = (params: IUserRepository.GetAll.Params): WhereOptions | undefined => {
		const filters: WhereOptions[] = [];

		if (params.cpf) filters.push({ cpf: { [Op.iLike]: `%${params.cpf.replace(/\D/g, '')}%` } });
		if (params.email) filters.push({ email: { [Op.iLike]: `%${params.email}%` } });
		if (params.phone) filters.push({ phone: { [Op.iLike]: `%${params.phone}%` } });
		if (params.rg) filters.push({ rg: { [Op.iLike]: `%${params.rg}%` } });
		if (params.city) filters.push({ 'address.city': { [Op.iLike]: `%${params.city}%` } });
		if (params.neighborhood) filters.push({ 'address.neighborhood': { [Op.iLike]: `%${params.neighborhood}%` } });
		if (params.state) filters.push({ 'address.state': { [Op.iLike]: `%${params.state}%` } });
		if (params.name)
			filters.push({
				[Op.or]: [{ firstName: { [Op.iLike]: `%${params.name}%` } }, { lastName: { [Op.iLike]: `%${params.name}%` } }],
			});
		if (params.birthdayFrom && params.birthdayTo)
			filters.push({
				birthday: { [Op.between]: [params.birthdayFrom, params.birthdayTo] },
			});

		if (filters.length === 0) return undefined;

		return { [Op.and]: filters };
	};

	private makeGetAllOrder(params: IUserRepository.GetAll.Params): Order | undefined {
		const order: Order = [];

		if (params.sortBy && params.sortDirection) order.push([params.sortBy, params.sortDirection]);

		order.push(['firstName', 'ASC']);
		order.push(['lastName', 'ASC']);

		return order;
	}

	private makeGetAllOffset(params: IUserRepository.GetAll.Params): number | undefined {
		if (params.pageNumber === undefined || params.pageNumber <= 0) return undefined;
		if (params.pageSize === undefined || params.pageSize <= 0) return undefined;

		return (params.pageNumber - 1) * params.pageSize;
	}

	private makeGetAllLimit(params: IUserRepository.GetAll.Params): number | undefined {
		if (params.pageSize === undefined || params.pageSize <= 0) return undefined;

		return params.pageSize;
	}
}
