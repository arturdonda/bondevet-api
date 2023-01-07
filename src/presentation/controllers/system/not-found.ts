import { notFound } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';

export class NotFoundController implements IController {
	async handle(request: HttpRequest): Promise<HttpResponse<any>> {
		return notFound({ message: 'Route not found', result: null });
	}
}
