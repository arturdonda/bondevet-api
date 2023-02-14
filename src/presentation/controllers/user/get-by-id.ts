import { IGetUserById } from '@domain/use-cases/user';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { UserViewModel } from '@presentation/view-models';

export class GetUserByIdController implements IController {
	constructor(private readonly service: IGetUserById) {}
	async handle(request: HttpRequest): Promise<HttpResponse<UserViewModel>> {
		try {
			if (!request.params.id) throw new MissingParamError('id');

			const user = await this.service.exec({ id: request.params.id });

			return ok({
				message: 'User retrieved successfully',
				result: UserViewModel.map(user, request.params.id === request.userId),
			});
		} catch (error) {
			return errorHandler(error, 'Error retrieving user');
		}
	}
}
