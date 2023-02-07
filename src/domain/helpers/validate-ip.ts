export function isIpValid(ip: string) {
	const REGEX_VALIDATOR = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

	return REGEX_VALIDATOR.test(ip);
}
