import { IRefreshSession } from '@domain/use-cases/session';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class RefreshSessionController implements IController {
	constructor(private readonly service: IRefreshSession) {}
	async handle(request: HttpRequest): Promise<HttpResponse<{ accessToken: string }>> {
		try {
			if (!request.body.browser) throw new MissingParamError('browser');
			if (!request.body.deviceType) throw new MissingParamError('deviceType');

			const result = await this.service.exec({
				userId: request.userId,
				ipAddress: request.ip,
				browser: request.body.browser,
				deviceType: request.body.deviceType,
				refreshToken: request.cookies.refreshToken,
			});

			return ok({ message: 'Session refreshed successfully', result });
		} catch (error) {
			return errorHandler(error, 'Error refreshing session');
		}
	}
}
