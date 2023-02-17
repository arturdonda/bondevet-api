import { TokenService } from '@infra/services';
import { unauthorized } from '@presentation/helpers';
import { Request, Response, NextFunction } from 'express';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
		return next(unauthorized({ message: 'Must login first.', result: null }));

	try {
		const tokenService = new TokenService();

		const { userId } = tokenService.decode({ token: req.headers.authorization.split(' ')[1], type: 'ACCESS_TOKEN' });

		req.userId = userId;

		return next();
	} catch (error) {
		console.log('error: ', error);
		next(
			unauthorized({ message: error.name === 'ExpiredTokenError' ? 'Token Expired' : 'Invalid Token', result: null })
		);
	}
};
