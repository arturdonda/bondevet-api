require('dotenv').config();
import '../../../module-alias';
import { configureDb, configureLogger, configureRoutes } from '@main/config';
import { createApiResponse } from '@main/middlewares';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';

export const configureApp = async (): Promise<Express> => {
	const app = express();

	// Setup logger
	configureLogger();

	// Setup middlewares
	app.use(express.json());
	app.use(cookieParser());

	// Setup routes
	configureRoutes(app);

	// Setup api response
	app.use(createApiResponse);

	// Setup database
	await configureDb();

	return app;
};
