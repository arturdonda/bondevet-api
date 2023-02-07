import { ICepService } from '@application/protocols/services';
import { InvalidCepError } from '@infra/errors';
import cepPromise from 'cep-promise';

export class CepService implements ICepService {
	lookup({ cep }: ICepService.Lookup.Params): ICepService.Lookup.Result {
		cep = cep.replace(/\D/g, '');

		if (cep.length !== 8) throw new InvalidCepError('must contain 8 digits');

		return cepPromise(cep)
			.then(result => ({
				state: result.state,
				city: result.city,
				neighborhood: result.neighborhood,
				street: result.street,
				number: '',
				additionalInfo: null,
				cep: result.cep,
			}))
			.catch(error => {
				throw new InvalidCepError('not found');
			});
	}
}
