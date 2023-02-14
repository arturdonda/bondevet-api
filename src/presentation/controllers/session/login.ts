import { ILogin } from '@domain/use-cases/session';
import { MissingParamError } from '@presentation/errors';
import { ok, unauthorized } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { UserViewModel } from '@presentation/view-models';

export class LoginController implements IController {
	constructor(private readonly service: ILogin) {}
	async handle(request: HttpRequest): Promise<HttpResponse<UserViewModel>> {
		try {
			if (!request.body.email) throw new MissingParamError('email');
			if (!request.body.password) throw new MissingParamError('password');
			if (!request.body.browser) throw new MissingParamError('browser');
			if (!request.body.deviceType) throw new MissingParamError('deviceType');

			const result = await this.service.exec({
				ipAddress: request.ip,
				email: request.body.email,
				password: request.body.password,
				browser: request.body.browser,
				deviceType: request.body.deviceType,
			});

			return ok({
				message: 'User logged in successfully',
				result: UserViewModel.map(result.user),
				cookies: { refreshToken: result.refreshToken },
				headers: { authorization: `Bearer ${result.accessToken}` },
			});
		} catch (error) {
			return unauthorized({ message: 'Invalid email or password', result: null as any });
		}
	}
}
