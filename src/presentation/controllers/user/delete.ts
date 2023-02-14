import { IDeleteUser } from '@domain/use-cases/user';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class DeleteUserController implements IController {
	constructor(private readonly service: IDeleteUser) {}
	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			await this.service.exec({ id: request.userId });

			return ok({ message: 'User deleted successfully', result: null });
		} catch (error) {
			return errorHandler(error, 'Error deleting user');
		}
	}
}
