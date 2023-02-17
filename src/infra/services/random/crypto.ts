import { IRandomService } from '@application/protocols/services';
import crypto from 'crypto';

export class RandomService implements IRandomService {
	string({ length }: IRandomService.String.Params): IRandomService.String.Result {
		if (length <= 0) throw new Error('Invalid length: must be greater than 0');

		const isOdd = !!(length % 2);

		const randomString = crypto.randomBytes(isOdd ? (length + 1) / 2 : length / 2).toString('hex');

		return isOdd ? randomString.slice(0, -1) : randomString;
	}
}
