import { IRefreshSession } from '@domain/use-cases/auth';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class RefreshSessionController implements IController {
	constructor(private readonly service: IRefreshSession) {}
	async handle(request: HttpRequest): Promise<HttpResponse<null>> {
		try {
			if (!request.body.browser) throw new MissingParamError('browser');
			if (!request.body.deviceType) throw new MissingParamError('deviceType');
			if (!request.cookies?.refreshToken) throw new Error('Missing Session Token');

			const { accessToken } = await this.service.exec({
				ipAddress: request.ip,
				browser: request.body.browser,
				deviceType: request.body.deviceType,
				refreshToken: request.cookies.refreshToken,
			});

			return ok({
				message: 'Session refreshed successfully',
				result: null,
				headers: { authorization: accessToken },
			});
		} catch (error) {
			return errorHandler(error, 'Error refreshing session');
		}
	}
}
