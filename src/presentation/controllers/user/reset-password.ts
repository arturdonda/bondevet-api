import { IResetUserPassword } from '@domain/use-cases/user';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class ResetUserPasswordController implements IController {
	constructor(private readonly service: IResetUserPassword) {}
	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.body.email) throw new MissingParamError('email');

			await this.service.exec({ email: request.body.email });

			return ok({ message: 'Email sent for password reset', result: null });
		} catch (error) {
			return errorHandler(error, 'Error sending email');
		}
	}
}
