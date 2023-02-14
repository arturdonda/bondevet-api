import { IRequestPasswordChange } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { IEmailService, ITokenService } from '@application/protocols/services';

export class RequestPasswordChange implements IRequestPasswordChange {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly emailService: IEmailService,
		private readonly tokenService: ITokenService
	) {}

	async exec({ email }: IRequestPasswordChange.Params): IRequestPasswordChange.Result {
		const user = await this.userRepository.getOne({ email });

		if (!user) return;

		const resetToken = this.tokenService.encode({
			payload: { id: user.id },
			type: 'OTHER',
			expiresIn: '1h',
		});

		await this.emailService.sendTemplate.resetPassword({ email, resetToken });
	}
}