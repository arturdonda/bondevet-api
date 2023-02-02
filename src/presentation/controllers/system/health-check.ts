import pkgJson from '@root/package.json';
import { ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class HealthCheckController implements IController {
	async handle(request: HttpRequest): Promise<HttpResponse<any>> {
		return ok({
			message: 'Welcome to BondeVet API',
			result: {
				name: pkgJson.name,
				description: pkgJson.description,
				version: pkgJson.version,
				repo: pkgJson.repository.url,
			},
		});
	}
}
