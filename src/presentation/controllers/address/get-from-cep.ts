import { IGetAddressFromCEP } from '@domain/use-cases/address';
import { MissingParamError } from '@presentation/errors';
import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { AddressViewModel } from '@presentation/view-models';

export class GetAddressFromCepController implements IController {
	constructor(private readonly service: IGetAddressFromCEP) {}
	async handle(request: HttpRequest): Promise<HttpResponse<AddressViewModel>> {
		try {
			if (!request.query.cep) throw new MissingParamError('cep');

			const cep = await this.service.exec({ cep: request.query.cep });

			return ok({ message: 'Address retrieved successfully', result: AddressViewModel.map(cep) });
		} catch (error) {
			return errorHandler(error, 'Error retrieving address');
		}
	}
}
