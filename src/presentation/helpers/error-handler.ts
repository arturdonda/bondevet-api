import { badRequest, internalServerError } from '@presentation/helpers';

export const errorHandler = (error: Error & { userError?: boolean }, friendlyMessage: string) => {
	return (error.userError ? badRequest : internalServerError)({
		message: friendlyMessage,
		result: {
			name: error.name,
			message: (error.userError ? '' : 'Internal Server Error: ') + error.message,
			stack: error.stack ?? null,
		} as any,
	});
};
