import { IGetAddressFromCEP } from '@domain/use-cases/address';
import { validateCEP } from '@domain/helpers';
import { ICepService } from '@application/protocols/services';

export class GetAddressFromCEP implements IGetAddressFromCEP {
	constructor(private readonly cepService: ICepService) {}

	exec({ cep }: IGetAddressFromCEP.Params): IGetAddressFromCEP.Result {
		cep = validateCEP(cep);

		return this.cepService.lookup({ cep });
	}
}
