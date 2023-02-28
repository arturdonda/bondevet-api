import { InvalidParamError } from '@domain/errors';

export function validateCEP(cep: string): string {
	cep = cep.replace(/\D/g, '');

	if (cep.length !== 8) throw new InvalidParamError('CEP', 'must be 8 digits long');

	return cep;
}
