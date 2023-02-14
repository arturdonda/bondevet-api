import { adaptRoute } from '@main/adapters';
import { getAddressFromCepController } from '@main/factories/address';
import { Router } from 'express';

export default (router: Router): void => {
	const prefix = 'address';

	router.get(`/${prefix}`, adaptRoute(getAddressFromCepController));
};
