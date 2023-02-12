import { unauthorized } from '@presentation/helpers';
import { validateSession } from '@main/factories/session';
import { Request, Response, NextFunction } from 'express';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
		return next(unauthorized({ message: 'Must login first.', result: null }));

	try {
		const { userId } = await validateSession.exec({ refreshToken: req.headers.authorization.split(' ')[1] });

		req.userId = userId;

		return next();
	} catch (error) {
		next(unauthorized({ message: error.message, result: null }));
	}
};
