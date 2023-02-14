import { IUpdateUser } from '@domain/use-cases/user';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { UserViewModel } from '@presentation/view-models';

export class UpdateUserController implements IController {
	constructor(private readonly service: IUpdateUser) {}
	async handle(request: HttpRequest): Promise<HttpResponse<UserViewModel>> {
		try {
			const user = await this.service.exec({
				id: request.userId,
				email: request.body.email,
				address: request.body.address,
				phone: request.body.phone,
			});

			return ok({ message: 'User updated successfully', result: UserViewModel.map(user) });
		} catch (error) {
			return errorHandler(error, 'Error updating user');
		}
	}
}
