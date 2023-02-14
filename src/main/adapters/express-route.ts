import { IController, HttpRequest } from '@presentation/protocols';
import { Request, Response, NextFunction } from 'express';

export const adaptRoute = (controller: IController) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest = makeHttpRequest(req);
		const httpResponse = await controller.handle(httpRequest);

		next(httpResponse);
	};
};

const makeHttpRequest = (req: Request): HttpRequest => {
	const request: HttpRequest = {
		ip: req.ip,
		params: req.params,
		query: req.query as Record<string, string>,
		headers: req.headers as Record<string, string>,
		cookies: req.cookies,
		body: req.body,
		userId: req.userId,
	};

	return request;
};
