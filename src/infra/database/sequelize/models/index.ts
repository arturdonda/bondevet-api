import { configureSchemaPublic, PublicModels } from './public';
import { Sequelize } from 'sequelize';

export const configureModels = (sequelize: Sequelize): Models => {
	const Public = configureSchemaPublic(sequelize);

	return { Public };
};

export type Models = {
	Public: PublicModels;
};
