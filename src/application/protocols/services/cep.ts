import { Address } from '@domain/entities';

export interface ICepService {
	lookup: (params: ICepService.Lookup.Params) => ICepService.Lookup.Result;
}

export namespace ICepService {
	export namespace Lookup {
		export type Params = Pick<Address, 'cep'>;
		export type Result = Promise<Address>;
	}
}
