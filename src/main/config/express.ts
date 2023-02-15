require('dotenv').config();
import '../../../module-alias';
import { configureDb, configureLogger, configureRoutes } from '@main/config';
import { createApiResponse } from '@main/middlewares';
import express, { Express } from 'express';

export const configureApp = async (): Promise<Express> => {
	const app = express();

	// Setup logger
	configureLogger();

	// Setup middlewares
	app.use(express.json());

	// Setup routes
	configureRoutes(app);

	// Setup api response
	app.use(createApiResponse);

	// Setup database
	await configureDb();

	return app;
};
