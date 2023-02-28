import { InvalidParamError } from '@domain/errors';

export function validateIp(ip: string): string {
	const REGEX_VALIDATOR = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

	if (!REGEX_VALIDATOR.test(ip)) throw new InvalidParamError('IP Address', 'invalid format');

	return ip;
}
