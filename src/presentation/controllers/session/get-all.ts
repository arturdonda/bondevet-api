import { Page } from '@domain/entities';
import { IGetAllSessions } from '@domain/use-cases/session';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { SessionViewModel } from '@presentation/view-models';

export class GetAllSessionsController implements IController {
	constructor(private readonly service: IGetAllSessions) {}
	async handle(request: HttpRequest): Promise<HttpResponse<Page<SessionViewModel>>> {
		try {
			const sessionPage = await this.service.exec({
				userId: request.userId,
				pageNumber: isNaN(Number.parseInt(request.query.pageNumber)) ? undefined : Number.parseInt(request.query.pageNumber),
				pageSize: isNaN(Number.parseInt(request.query.pageSize)) ? undefined : Number.parseInt(request.query.pageSize),
				sortBy: request.query.sortBy as any,
				sortDirection: request.query.sortDirection as any,
			});

			return ok({
				message: 'Sessions retrieved successfully',
				result: SessionViewModel.mapPage(sessionPage),
			});
		} catch (error) {
			return errorHandler(error, 'Error retrieving sessions');
		}
	}
}
