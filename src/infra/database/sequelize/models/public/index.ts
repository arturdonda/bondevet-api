import { sessionModel } from './session';
import { userModel } from './user';
import { Sequelize, ModelStatic, Model } from 'sequelize';

export const configureSchemaPublic = (sequelize: Sequelize) => {
	const SCHEMA_NAME = 'public';

	const Session = sequelize.define(`${SCHEMA_NAME}_Session`, sessionModel, {
		schema: SCHEMA_NAME,
		tableName: 'sessions',
	});

	const User = sequelize.define(`${SCHEMA_NAME}_User`, userModel, {
		schema: SCHEMA_NAME,
		tableName: 'users',
	});

	return { Session, User };
};

export type PublicModels = {
	Session: ModelStatic<Model>;
	User: ModelStatic<Model>;
};
