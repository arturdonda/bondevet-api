import { DataTypes, ModelAttributes } from 'sequelize';

export const sessionModel: ModelAttributes = {
	refreshToken: {
		type: DataTypes.STRING(32),
		primaryKey: true,
		allowNull: false,
		unique: true,
		field: 'refresh_token',
	},
	csfr: {
		type: DataTypes.STRING(32),
		allowNull: false,
		unique: true,
		field: 'csfr',
	},
	userId: {
		type: DataTypes.STRING(32),
		allowNull: false,
		field: 'user_id',
		references: {
			model: 'users',
			key: 'id',
		},
	},
	metadata: {
		type: DataTypes.JSONB,
		allowNull: false,
		field: 'metadata',
	},
};
