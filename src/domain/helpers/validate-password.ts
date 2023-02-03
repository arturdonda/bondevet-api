export function isPasswordValid(password: string, validationType: ValidationType) {
	if (validationType.maxLenght && validationType.maxLenght < validationType.minLenght)
		throw new Error('maxLenght must be greater than or equal to minLenght');

	// Validates min lenght
	if (password.length < validationType.minLenght) return false;

	// Validates max lenght
	if (validationType.maxLenght && password.length > validationType.maxLenght) return false;

	// Validates if has lowercase characters
	if (validationType.mustHave?.lowercase && !/^(?=.*[a-z]).*$/.test(password)) return false;

	// Validates if has uppercase characters
	if (validationType.mustHave?.uppercase && !/^(?=.*[A-Z]).*$/.test(password)) return false;

	// Validates if has digit characters
	if (validationType.mustHave?.digit && !/^(?=.*[0-9]).*$/.test(password)) return false;

	// Validates if has special characters
	if (validationType.mustHave?.special && !/^(?=.*[!@#$%^&*()_\-+={[}\]\\|:;'",<.>\/?`~ ]).*$/.test(password))
		return false;

	return true;
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
