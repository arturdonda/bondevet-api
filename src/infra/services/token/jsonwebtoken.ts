import { ITokenService } from '@application/protocols/services';
import { ExpiredTokenError, InvalidTokenError } from '@infra/errors';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class TokenService implements ITokenService {
	private readonly AUDIENCE = '';
	private readonly ISSUER = '';

	encode({ payload, type = 'ACCESS_TOKEN' }: ITokenService.Encode.Params): ITokenService.Encode.Result {
		const SECRET = type === 'ACCESS_TOKEN' ? process.env.ACCESS_TOKEN_SECRET : process.env.OTHER_TOKENS_SECRET;

		return jwt.sign(payload, SECRET, {
			audience: this.AUDIENCE,
			issuer: this.ISSUER,
		});
	}

	decode({ token, type = 'ACCESS_TOKEN' }: ITokenService.Decode.Params): ITokenService.Decode.Result {
		const SECRET = type === 'ACCESS_TOKEN' ? process.env.ACCESS_TOKEN_SECRET : process.env.OTHER_TOKENS_SECRET;

		try {
			return jwt.verify(token, SECRET, {
				audience: this.AUDIENCE,
				issuer: this.ISSUER,
			}) as JwtPayload;
		} catch (error) {
			throw error.name === 'TokenExpiredError' ? new ExpiredTokenError() : new InvalidTokenError();
		}
	}
}
