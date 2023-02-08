import { Address } from '@domain/entities';
import { WithPartial } from '@application/utility-types';

export class AddressViewModel {
	private readonly state: string;
	private readonly city: string;
	private readonly neighborhood: string;
	private readonly street: string;
	private readonly number: string | undefined;
	private readonly additionalInfo: string | undefined;
	private readonly cep: string;

	constructor(params: Params) {
		this.state = params.state;
		this.city = params.city;
		this.neighborhood = params.neighborhood;
		this.street = params.street;
		this.number = params.number;
		this.additionalInfo = params.additionalInfo ?? undefined;
		this.cep = params.cep;
	}

	static map(address: Params): AddressViewModel {
		return new AddressViewModel(address);
	}

	static mapCollection(addresses: Params[]): AddressViewModel[] {
		return addresses.map(address => new AddressViewModel(address));
	}
}

type Params = WithPartial<Address, 'additionalInfo' | 'number'>;
