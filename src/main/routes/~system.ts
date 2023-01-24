import { adaptRoute } from '@main/adapters';
import { healthCheckController, notFoundController, secretController } from '@main/factories/system';
import { Router } from 'express';

export default (router: Router): void => {
	router.get('/', adaptRoute(healthCheckController));

	router.get('/secret', adaptRoute(secretController));

	router.get('*', adaptRoute(notFoundController));
	// *** This route must be the last one to be added to the router, otherwise will overide other routes.
};
