import { IDeleteSession } from '@domain/use-cases/session';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class DeleteSessionController implements IController {
	constructor(private readonly service: IDeleteSession) {}
	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.params.refreshToken) throw new MissingParamError('refreshToken');

			await this.service.exec({ refreshToken: request.params.refreshToken, userId: request.userId });

			return ok({ message: 'Session deleted successfully', result: null });
		} catch (error) {
			return errorHandler(error, 'Error deleting session');
		}
	}
}
