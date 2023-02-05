export interface IUuidService {
	generate: () => IUuidService.Generate.Result;
}

export namespace IUuidService {
	export namespace Generate {
		export type Result = string;
	}
}
