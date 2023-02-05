import { User } from '@domain/entities';

export interface IEmailService {
	send: ({ to, cc, bcc, subject, body }: IEmailService.Send.Params) => IEmailService.Send.Result;
	sendTemplate: {
		invite: (params: IEmailService.Invite.Params) => IEmailService.Invite.Result;
		resetPassword: (params: IEmailService.ResetPassword.Params) => IEmailService.ResetPassword.Result;
		changePasswordWarning: (
			params: IEmailService.ChangePasswordWarning.Params
		) => IEmailService.ChangePasswordWarning.Result;
	};
}

export namespace IEmailService {
	export namespace Send {
		export type Params = {
			to: string | string[];
			cc?: string | string[];
			bcc?: string | string[];
			subject: string;
			body: string;
		};
		export type Result = Promise<void>;
	}

	export namespace Invite {
		export type Params = Pick<User, 'firstName' | 'lastName' | 'email'> & { inviteToken: string };
		export type Result = Promise<void>;
	}
	export namespace ResetPassword {
		export type Params = Pick<User, 'email'> & { resetToken: string };
		export type Result = Promise<void>;
	}
	export namespace ChangePasswordWarning {
		export type Params = Pick<User, 'email'>;
		export type Result = Promise<void>;
	}
}
