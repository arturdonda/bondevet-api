import { IEmailService } from '@application/protocols/services';
import { EMAIL_TEMPLATES } from '@infra/services/email/templates';
import nodemailer from 'nodemailer';

export class EmailService implements IEmailService {
	private _transport: nodemailer.Transporter;

	constructor() {
		this._transport = nodemailer.createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.EMAIL_SERVICE_USERNAME,
				pass: process.env.EMAIL_SERVICE_PASSWORD,
			},
		});
	}

	async send({ to, cc, bcc, subject, htmlBody: html }: IEmailService.Send.Params): IEmailService.Send.Result {
		const from = `"BondeVet Hospital Veterinário" <${process.env.EMAIL_SERVICE_USERNAME}>`;

		await this._transport.sendMail({ from, to, cc, bcc, subject, html });
	}

	get sendTemplate() {
		return {
			invite: this.invite.bind(this),
			resetPassword: this.resetPassword.bind(this),
		};
	}

	private invite(params: IEmailService.Invite.Params): IEmailService.Invite.Result {
		const { subject, htmlBody } = EMAIL_TEMPLATES.invite(params);

		return this.send({ to: params.email, subject, htmlBody });
	}

	private resetPassword(params: IEmailService.ResetPassword.Params): IEmailService.ResetPassword.Result {
		const { subject, htmlBody } = EMAIL_TEMPLATES.resetPassword(params);

		return this.send({ to: params.email, subject, htmlBody });
	}
}
