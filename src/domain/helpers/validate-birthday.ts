import { InvalidParamError } from '@domain/errors';

export function validateBirthday(birthday: string): string {
	if (!/\d{4}-\d{2}-\d{2}/.test(birthday)) throw new InvalidParamError('birthday', 'invalid format');

	const parsedDate = new Date(birthday);

	if (parsedDate >= new Date()) throw new InvalidParamError('birthday', 'future date');

	return parsedDate.toISOString().split('T')[0];
}
