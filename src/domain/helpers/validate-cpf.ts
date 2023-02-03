export function isCPFValid(cpf: string): boolean {
	cpf = cpf.replace(/\D/g, '');

	if (cpf.length !== 11) return false;

	let digits = cpf.split('').map(x => parseInt(x));

	let firstDigit =
		(digits.reduce((total, digit, index) => (index < 9 ? total + digit * (10 - index) : total), 0) * 10) % 11;

	let secondDigit =
		((digits.reduce((total, digit, index) => (index < 9 ? total + digit * (11 - index) : total), 0) + firstDigit * 2) *
			10) %
		11;

	if (firstDigit !== digits[9] || secondDigit !== digits[10]) return false;

	return true;
}
