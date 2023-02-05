import { IInviteUser } from '@domain/use-cases/user';
import { IEmailService, ITokenService } from '@application/protocols/services';

export class InviteUser implements IInviteUser {
	constructor(private readonly tokenService: ITokenService, private readonly emailService: IEmailService) {}

	async exec({ email, firstName, lastName }: IInviteUser.Params): IInviteUser.Result {
		const inviteToken = this.tokenService.encode({ email, firstName, lastName });

		return this.emailService.sendTemplate.invite({
			email,
			firstName,
			lastName,
			inviteToken,
		});
	}
}
