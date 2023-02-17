import { DataTypes, ModelAttributes } from 'sequelize';

export const userModel: ModelAttributes = {
	id: {
		type: DataTypes.STRING(32),
		primaryKey: true,
		allowNull: false,
		unique: true,
		field: 'id',
	},
	firstName: {
		type: DataTypes.STRING(50),
		allowNull: false,
		field: 'first_name',
	},
	lastName: {
		type: DataTypes.STRING(50),
		allowNull: false,
		field: 'last_name',
	},
	cpf: {
		type: DataTypes.STRING(11),
		allowNull: false,
		unique: true,
		field: 'cpf',
	},
	rg: {
		type: DataTypes.STRING(11),
		allowNull: false,
		unique: true,
		field: 'rg',
	},
	phone: {
		type: DataTypes.STRING(11),
		allowNull: false,
		unique: true,
		field: 'phone',
	},
	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
		field: 'email',
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'password',
	},
	birthday: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		field: 'birthday',
	},
	address: {
		type: DataTypes.JSONB,
		allowNull: false,
		field: 'address',
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'created_at',
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'updated_at',
	},
	deletedAt: {
		type: DataTypes.DATE,
		allowNull: true,
		field: 'deleted_at',
	},
};
