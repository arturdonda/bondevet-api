import { IEmailService } from '@application/protocols/services';

export function resetPasswordEmailTemplate({ resetToken }: IEmailService.ResetPassword.Params) {
	const subject = 'Alteração de senha';

	const htmlBody = `
	<p>Foi solicitada uma altera&ccedil;&atilde;o de senha na plataforma BondeVet.</p>
	<p><a href="${process.env.FRONTEND_BASE_URL}/reset-password?token=${resetToken}">Clique aqui</a> para alterar a sua senha.</p>
	<p>Caso voc&ecirc; n&atilde;o reconhe&ccedil;a esta solicita&ccedil;&atilde;o, apenas ignore este e-mail.</p>
	`;

	return { subject, htmlBody };
}
