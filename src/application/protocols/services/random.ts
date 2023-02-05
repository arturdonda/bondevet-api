export interface IRandomService {
	string: (params?: IRandomService.String.Params) => IRandomService.String.Result;
}

export namespace IRandomService {
	export namespace String {
		export type Params = { length: number };
		export type Result = string;
	}
}
