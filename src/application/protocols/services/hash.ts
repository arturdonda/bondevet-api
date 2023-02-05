export interface IHashService {
	hash: (params: IHashService.Hash.Params) => IHashService.Hash.Result;
	verify: (params: IHashService.Verify.Params) => IHashService.Verify.Result;
}

export namespace IHashService {
	export namespace Hash {
		export type Params = string;
		export type Result = string;
	}
	export namespace Verify {
		export type Params = { text: string; hash: string };
		export type Result = boolean;
	}
}
