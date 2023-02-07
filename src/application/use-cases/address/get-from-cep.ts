import { IGetAddressFromCEP } from '@domain/use-cases/address';
import { ICepService } from '@application/protocols/services';

export class GetAddressFromCEP implements IGetAddressFromCEP {
	constructor(private readonly cepService: ICepService) {}

	exec(cep: IGetAddressFromCEP.Params): IGetAddressFromCEP.Result {
		return this.cepService.lookup(cep);
	}
}
