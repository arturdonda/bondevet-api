import { User } from '@domain/entities';

export interface IEmailService {
	send: (params: IEmailService.Send.Params) => IEmailService.Send.Result;
	sendTemplate: {
		invite: (params: IEmailService.Invite.Params) => IEmailService.Invite.Result;
		resetPassword: (params: IEmailService.ResetPassword.Params) => IEmailService.ResetPassword.Result;
	};
}

export namespace IEmailService {
	export namespace Send {
		export type Params = {
			to: string | string[];
			cc?: string | string[];
			bcc?: string | string[];
			subject: string;
			htmlBody: string;
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
}
