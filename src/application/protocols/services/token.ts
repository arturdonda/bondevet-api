export interface ITokenService {
	encode: (params: ITokenService.Encode.Params) => ITokenService.Encode.Result;
	decode: (params: ITokenService.Decode.Params) => ITokenService.Decode.Result;
}

export namespace ITokenService {
	export namespace Encode {
		export type Params = { payload: Record<string, any>; type?: 'ACCESS_TOKEN' | 'OTHER' };
		export type Result = string;
	}
	export namespace Decode {
		export type Params = { token: string; type?: 'ACCESS_TOKEN' | 'OTHER' };
		export type Result = Record<string, any>;
	}
}
