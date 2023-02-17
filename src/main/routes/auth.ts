import { adaptRoute } from '@main/adapters';
import { authorize } from '@main/middlewares/authorize';
import {
	forgotPasswordController,
	loginController,
	refreshSessionController,
	resetPasswordController,
} from '@main/factories/auth';
import { Router } from 'express';

export default (router: Router): void => {
	const prefix = 'auth';

	router.post(`/${prefix}/login`, adaptRoute(loginController));

	router.post(`/${prefix}/refresh`, adaptRoute(refreshSessionController));

	router.post(`/${prefix}/forgot-password`, adaptRoute(forgotPasswordController));

	router.post(`/${prefix}/reset-password`, adaptRoute(resetPasswordController));
};
