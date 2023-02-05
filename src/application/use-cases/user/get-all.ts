import { IGetAllUsers } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { parsePageParams } from '@application/helpers';

export class GetAllUsers implements IGetAllUsers {
	constructor(private readonly userRepository: IDatabase.Repositories.User) {}

	async exec(params?: IGetAllUsers.Params): IGetAllUsers.Result {
		const pageParams = parsePageParams(params);

		return this.userRepository.getAll({
			...pageParams,
			sortBy: params?.sortBy ?? 'firstName',
			sortDirection: params?.sortDirection ?? 'ASC',
		});
	}
}