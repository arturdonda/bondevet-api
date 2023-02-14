import { Page } from '@domain/entities';
import { IGetAllUsers } from '@domain/use-cases/user';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { UserViewModel } from '@presentation/view-models';

export class GetAllUsersController implements IController {
	constructor(private readonly service: IGetAllUsers) {}
	async handle(request: HttpRequest): Promise<HttpResponse<Page<UserViewModel>>> {
		try {
			const userPage = await this.service.exec({
				...request.query,
				pageNumber: isNaN(Number.parseInt(request.query.pageNumber)) ? undefined : Number.parseInt(request.query.pageNumber),
				pageSize: isNaN(Number.parseInt(request.query.pageSize)) ? undefined : Number.parseInt(request.query.pageSize),
			});

			return ok({ message: 'Users retrieved successfully', result: UserViewModel.mapPage(userPage) });
		} catch (error) {
			return errorHandler(error, 'Error retrieving users');
		}
	}
}
