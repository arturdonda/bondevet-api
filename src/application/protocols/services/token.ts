export interface ITokenService {
	encode: (params: ITokenService.Encode.Params) => ITokenService.Encode.Result;
	decode: (params: ITokenService.Decode.Params) => ITokenService.Decode.Result;
}

export namespace ITokenService {
	export namespace Encode {
		export type Params = Record<string, any>;
		export type Result = string;
	}
	export namespace Decode {
		export type Params = string;
		export type Result = DefaultTokenProperties & Record<string, any>;
	}
}

type DefaultTokenProperties = {
	issuedAt: Date;
	expiredAt: Date;
	audience: string;
	issuer: string;
};
