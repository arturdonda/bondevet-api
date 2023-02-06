import { IUuidService } from '@application/protocols/services';
import crypto from 'crypto';

export class UuidService implements IUuidService {
	generate(): string {
		return crypto.randomUUID().replace(/-/g, '');
	}
}
