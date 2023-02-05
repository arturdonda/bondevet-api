import { IEmailService } from '@application/protocols/services';

export function inviteEmailTemplate({ firstName, lastName, inviteToken }: IEmailService.Invite.Params) {
	const subject = `Convite para a plataforma BondeVet`;

	const htmlBody = `
		<p>Ol&aacute; ${firstName} ${lastName},</p>
		<p>Voc&ecirc; foi convidado(a) para participar da plataforma BondeVet.</p>
		<p><a href="${process.env.FRONTEND_BASE_URL}/invite?token=${inviteToken}">Clique aqui</a> para fazer o seu cadastro.</p>
		`;

	return { subject, htmlBody };
}
