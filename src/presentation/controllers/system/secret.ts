import { ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class SecretController implements IController {
	async handle(request: HttpRequest): Promise<HttpResponse<any>> {
		return ok({
			message: 'Secrets Manager',
			result: {
				secret: process.env.SECRET
			},
		});
	}
}
