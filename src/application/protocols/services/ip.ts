export interface IIpService {
	lookup: (params: IIpService.Lookup.Params) => IIpService.Lookup.Result;
}

export namespace IIpService {
	export namespace Lookup {
		export type Params = string;
		export type Result = Promise<{
			country: { code: string; name: string };
			region: { code: string; name: string };
			city: string;
		}>;
	}
}
