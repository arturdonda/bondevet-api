import { InvalidParamError } from '@domain/errors';

export function validatePassword(password: string): string {
	const VALIDATION_RULES: ValidationType = { minLenght: 8, mustHave: { uppercase: true, digit: true } };

	if (VALIDATION_RULES.maxLenght && VALIDATION_RULES.maxLenght < VALIDATION_RULES.minLenght)
		throw new Error('maxLenght must be greater than or equal to minLenght');

	// Validates min lenght
	if (password.length < VALIDATION_RULES.minLenght)
		throw new InvalidParamError('password', `must be at least ${VALIDATION_RULES.minLenght} characters long`);

	// Validates max lenght
	if (VALIDATION_RULES.maxLenght && password.length > VALIDATION_RULES.maxLenght)
		throw new InvalidParamError('password', `must be at maximum of ${VALIDATION_RULES.minLenght} characters`);

	// Validates if has lowercase characters
	if (VALIDATION_RULES.mustHave?.lowercase && !/^(?=.*[a-z]).*$/.test(password))
		throw new InvalidParamError('password', `must contain lowercaser characters`);

	// Validates if has uppercase characters
	if (VALIDATION_RULES.mustHave?.uppercase && !/^(?=.*[A-Z]).*$/.test(password))
		throw new InvalidParamError('password', `must contain uppercaser characters`);

	// Validates if has digit characters
	if (VALIDATION_RULES.mustHave?.digit && !/^(?=.*[0-9]).*$/.test(password))
		throw new InvalidParamError('password', `must contain at least one digit`);

	// Validates if has special characters
	if (VALIDATION_RULES.mustHave?.special && !/^(?=.*[!@#$%^&*()_\-+={[}\]\\|:;'",<.>\/?`~ ]).*$/.test(password))
		throw new InvalidParamError('password', `must contain special characters`);

	return password;
}

type ValidationType = {
	minLenght: number;
	maxLenght?: number;
	mustHave?: {
		lowercase?: boolean;
		uppercase?: boolean;
		digit?: boolean;
		special?: boolean;
	};
};
