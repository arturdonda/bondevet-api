import { InvalidParamError } from '@domain/errors';

export function validateEmail(email: string): string {
	email = email.trim().toLowerCase();

	const REGEX_VALIDATOR =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!REGEX_VALIDATOR.test(email)) throw new InvalidParamError('email', 'invalid email format');

	return email;
}
