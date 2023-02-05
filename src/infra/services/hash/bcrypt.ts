import { IHashService } from '@application/protocols/services';
import bcrypt from 'bcryptjs';

export class HashService implements IHashService {
	hash(text: IHashService.Hash.Params): IHashService.Hash.Result {
		const salt = bcrypt.genSaltSync();

		return bcrypt.hashSync(text, salt);
	}

	verify({ text, hash }: IHashService.Verify.Params): IHashService.Verify.Result {
		return bcrypt.compareSync(text, hash);
	}
}
