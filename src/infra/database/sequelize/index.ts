import { IDatabase } from '@application/protocols/database';
import { configureModels, Models } from '@infra/database/sequelize/models';
import { SessionRepository, UserRepository } from '@infra/database/sequelize/repositories/public';
import { Sequelize } from 'sequelize';

let sequelize: Sequelize;
let models: Models;

export const database: IDatabase = {
	connect: (connectionString: string): Promise<void> => {
		sequelize = new Sequelize(connectionString, {
			define: {
				freezeTableName: true,
				schema: 'public',
				timestamps: false,
			},
			logging: false,
		});

		models = configureModels(sequelize);

		return sequelize.authenticate().then(() => console.log('[Database]: 📖 Connection established'));
	},

	disconnect: (): Promise<void> => sequelize.close().then(() => console.log('[Database]: 📘 Connection terminated')),

	get repositories() {
		return {
			Session: new SessionRepository(models.Public.Session),
			User: new UserRepository(models.Public.User),
		};
	},
};
