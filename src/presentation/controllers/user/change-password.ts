import { IChangeUserPassword } from '@domain/use-cases/user';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class ChangeUserPasswordController implements IController {
	constructor(private readonly service: IChangeUserPassword) {}
	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.body.password) throw new MissingParamError('password');

			await this.service.exec({ id: request.userId, password: request.body.password });

			return ok({ message: 'Password changed successfully', result: null });
		} catch (error) {
			return errorHandler(error, 'Error changing password');
		}
	}
}
