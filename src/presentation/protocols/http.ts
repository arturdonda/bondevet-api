import { ApiResponse } from '.';

export type HttpRequest = {
	ip: string;
	params: Record<string, string>;
	query: Record<string, string>;
	headers: Record<string, string>;
	cookies: Record<string, string>;
	body: any;
	userId: string;
};

export type HttpResponse<T = any> = {
	statusCode: number;
	headers: Record<string, string>;
	cookies: Record<string, string>;
	body: ApiResponse<T>;
};
