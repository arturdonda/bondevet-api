import { IInviteUser } from '@domain/use-cases/user';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class InviteUserController implements IController {
	constructor(private readonly service: IInviteUser) {}
	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.body.email) throw new MissingParamError('email');
			if (!request.body.firstName) throw new MissingParamError('firstName');
			if (!request.body.lastName) throw new MissingParamError('lastName');

			await this.service.exec({
				email: request.body.email,
				firstName: request.body.firstName,
				lastName: request.body.lastName,
			});

			return ok({ message: 'Invite sent successfully', result: null });
		} catch (error) {
			return errorHandler(error, 'Error sending invite');
		}
	}
}
