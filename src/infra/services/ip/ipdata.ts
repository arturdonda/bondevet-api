import { isIpValid } from '@domain/helpers';
import { IIpService } from '@application/protocols/services';
import { InvalidIpError } from '@infra/errors';
import IPData from 'ipdata';

export class IpService implements IIpService {
	private _ipdataClient: IPData;

	constructor() {
		this._ipdataClient = new IPData(process.env.IPDATA_KEY);
	}

	lookup = async (ipAddress: IIpService.Lookup.Params): IIpService.Lookup.Result => {
		if (!isIpValid(ipAddress)) throw new InvalidIpError(ipAddress);

		const result = await this._ipdataClient.lookup(ipAddress);

		if (result.status === 400) throw new InvalidIpError(ipAddress);

		return {
			country: {
				code: result.country_code,
				name: result.country_name,
			},
			region: {
				code: result.region_code ?? '',
				name: result.region ?? '',
			},
			city: result.city ?? '',
		};
	};
}
