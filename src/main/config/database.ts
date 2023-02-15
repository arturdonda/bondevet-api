import { database } from '@infra/database';

export const configureDb = async (): Promise<void> => {
	if (process.env.NODE_ENV === 'test') return;

	await database.connect(
		`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
	);
};
