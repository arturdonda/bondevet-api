import { DataTypes, ModelAttributes } from 'sequelize';

export const sessionModel: ModelAttributes = {
	refreshToken: {
		type: DataTypes.STRING(32),
		primaryKey: true,
		allowNull: false,
		unique: true,
		field: 'refresh_token',
	},
	csrf: {
		type: DataTypes.STRING(32),
		allowNull: false,
		unique: true,
		field: 'csrf',
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
