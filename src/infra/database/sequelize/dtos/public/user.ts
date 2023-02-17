import { User } from '@domain/entities';
import { Model } from 'sequelize';

export class UserDTO {
	private static transform(model: Model): User {
		const dbUser = model.get();

		return new User({
			id: dbUser.id,
			firstName: dbUser.firstName,
			lastName: dbUser.lastName,
			cpf: dbUser.cpf,
			rg: dbUser.rg,
			phone: dbUser.phone,
			email: dbUser.email,
			password: dbUser.password,
			birthday: new Date(dbUser.birthday),
			address: dbUser.address,
			createdAt: new Date(dbUser.createdAt),
			updatedAt: new Date(dbUser.updatedAt),
			deletedAt: dbUser.deletedAt ? new Date(dbUser.deletedAt) : null,
		});
	}

	static single(model: Model): User {
		return this.transform(model);
	}

	static multiple(models: Model[]): User[] {
		return models.map(this.transform);
	}
}
