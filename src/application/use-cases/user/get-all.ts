import { IGetAllUsers } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { parsePageParams } from '@application/helpers';
import { validateBirthday } from '@domain/helpers';

export class GetAllUsers implements IGetAllUsers {
	constructor(private readonly userRepository: IDatabase.Repositories.User) {}

	async exec(params: IGetAllUsers.Params): IGetAllUsers.Result {
		const pageParams = parsePageParams(params);

		return this.userRepository.getAll({
			...params,
			...pageParams,
			birthday:
				params.birthdayFrom && params.birthdayTo
					? [validateBirthday(params.birthdayFrom), validateBirthday(params.birthdayTo)]
					: undefined,
			sortBy: params?.sortBy ?? 'firstName',
			sortDirection: params?.sortDirection ?? 'ASC',
		});
	}
}
