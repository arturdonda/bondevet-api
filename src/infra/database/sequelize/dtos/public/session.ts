import { Session } from '@domain/entities';
import { Model } from 'sequelize';

export class SessionDTO {
	private static transform(model: Model): Session {
		const dbSession = model.get();

		return new Session({
			refreshToken: dbSession.refreshToken,
			csrf: dbSession.csrf,
			userId: dbSession.userId,
			metadata: { ...dbSession.metadata, date: new Date(dbSession.metadata.date) },
		});
	}

	static single(model: Model): Session {
		return this.transform(model);
	}

	static multiple(models: Model[]): Session[] {
		return models.map(this.transform);
	}
}
