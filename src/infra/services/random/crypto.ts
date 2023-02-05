import { IRandomService } from '@application/protocols/services';
import crypto from 'crypto';

export class RandomService implements IRandomService {
	string({ length }: IRandomService.String.Params): IRandomService.String.Result {
		return crypto.randomBytes(length ?? 32).toString('hex');
	}
}
