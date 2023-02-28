import { InvalidParamError } from '@domain/errors';

export function validatePhone(phone: string): string {
	phone = phone.replace(/\D/g, '');

	if (phone.length !== 11) throw new InvalidParamError('phone', 'must be 11 digits long');

	return phone;
}
