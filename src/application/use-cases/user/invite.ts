import { IInviteUser } from '@domain/use-cases/user';
import { IEmailService, ITokenService } from '@application/protocols/services';
import { IDatabase } from '@application/protocols/database';
import { UserRegisteredError } from '@application/errors';

export class InviteUser implements IInviteUser {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly tokenService: ITokenService,
		private readonly emailService: IEmailService
	) {}

	async exec({ email, firstName, lastName }: IInviteUser.Params): IInviteUser.Result {
		const user = await this.userRepository.getOne({ email, includeDeleted: true });

		if (user) throw new UserRegisteredError('Email');

		const inviteToken = this.tokenService.encode({
			payload: { email, firstName, lastName },
			type: 'OTHER',
		});

		return this.emailService.sendTemplate.invite({
			email,
			firstName,
			lastName,
			inviteToken,
		});
	}
}
