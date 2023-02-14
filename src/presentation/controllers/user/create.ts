import { ICreateUser } from '@domain/use-cases/user';
import { MissingParamError } from '@presentation/errors';
import { created, errorHandler } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { UserViewModel } from '@presentation/view-models';

export class CreateUserController implements IController {
	constructor(private readonly service: ICreateUser) {}
	async handle(request: HttpRequest): Promise<HttpResponse<UserViewModel>> {
		try {
			if (!request.body.firstName) throw new MissingParamError('firstName');
			if (!request.body.lastName) throw new MissingParamError('lastName');
			if (!request.body.cpf) throw new MissingParamError('cpf');
			if (!request.body.rg) throw new MissingParamError('rg');
			if (!request.body.phone) throw new MissingParamError('phone');
			if (!request.body.email) throw new MissingParamError('email');
			if (!request.body.password) throw new MissingParamError('password');
			if (!request.body.birthday) throw new MissingParamError('birthday');
			if (!request.body.address) throw new MissingParamError('address');

			const user = await this.service.exec({
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				cpf: request.body.cpf,
				rg: request.body.rg,
				phone: request.body.phone,
				email: request.body.email,
				password: request.body.password,
				birthday: request.body.birthday,
				address: request.body.address,
			});

			return created({ message: 'User created successfully', result: UserViewModel.map(user) });
		} catch (error) {
			return errorHandler(error, 'Error creating user');
		}
	}
}
