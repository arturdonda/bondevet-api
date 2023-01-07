import { HttpRequest, HttpResponse } from '.';

export interface IController {
	handle: (request: HttpRequest) => Promise<HttpResponse>;
}
