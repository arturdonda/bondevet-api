import { IChangeUserPasswordWithToken } from '@domain/use-cases/auth';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class ChangeUserPasswordWithTokenController implements IController {
	constructor(private readonly service: IChangeUserPasswordWithToken) {}
	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.body.resetToken) throw new MissingParamError('resetToken');
			if (!request.body.password) throw new MissingParamError('password');

			await this.service.exec({ resetToken: request.body.resetToken, password: request.body.password });

			return ok({ message: 'Password changed successfully', result: null });
		} catch (error) {
			return errorHandler(error, 'Error changing password');
		}
	}
}
