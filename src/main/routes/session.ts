import { adaptRoute } from '@main/adapters';
import { deleteSessionController, getAllSessionsController } from '@main/factories/session';
import { authorize } from '@main/middlewares/authorize';
import { Router } from 'express';

export default (router: Router): void => {
	const prefix = 'sessions';

	router.get(`/${prefix}`, authorize, adaptRoute(getAllSessionsController));

	router.delete(`/${prefix}/:sessionId`, authorize, adaptRoute(deleteSessionController));
};
