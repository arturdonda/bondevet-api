import { Address } from '@domain/entities';

export interface IGetAddressFromCEP {
	exec: (params: IGetAddressFromCEP.Params) => IGetAddressFromCEP.Result;
}

export namespace IGetAddressFromCEP {
	export type Params = Pick<Address, 'cep'>;
	export type Result = Promise<Omit<Address, 'additionalInfo' | 'number'>>;
}
