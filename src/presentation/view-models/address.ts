import { Address, Page } from '@domain/entities';
import { WithPartial } from '@domain/utility-types';

export class AddressViewModel {
	private readonly state: string;
	private readonly city: string;
	private readonly neighborhood: string;
	private readonly street: string;
	private readonly number: string | undefined;
	private readonly additionalInfo: string | undefined;
	private readonly cep: string;

	constructor(params: PartialAddress) {
		this.state = params.state;
		this.city = params.city;
		this.neighborhood = params.neighborhood;
		this.street = params.street;
		this.number = params.number;
		this.additionalInfo = params.additionalInfo ?? undefined;
		this.cep = params.cep;
	}

	static map(address: PartialAddress): AddressViewModel {
		return new AddressViewModel(address);
	}

	static mapPage(addressPage: Page<PartialAddress>): Page<AddressViewModel> {
		return { ...addressPage, data: addressPage.data.map(AddressViewModel.map) };
	}
}

type PartialAddress = WithPartial<Address, 'additionalInfo' | 'number'>;
