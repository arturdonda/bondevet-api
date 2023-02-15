import { adaptRoute } from '@main/adapters';
import { authorize } from '@main/middlewares/authorize';
import {
	changeUserPasswordWithTokenController,
	loginController,
	refreshSessionController,
	requestPasswordChangeController,
} from '@main/factories/auth';
import { Router } from 'express';

export default (router: Router): void => {
	const prefix = 'auth';

	router.post(`/${prefix}/login`, adaptRoute(loginController));

	router.post(`/${prefix}/refresh`, authorize, adaptRoute(refreshSessionController));

	router.post(`/${prefix}/forgot-password`, adaptRoute(requestPasswordChangeController));

	router.post(`/${prefix}/reset-password`, adaptRoute(changeUserPasswordWithTokenController));
};
