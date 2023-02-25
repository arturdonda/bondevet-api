import { User } from '@domain/entities';
import { ICreateUser } from '@domain/use-cases/user';
import { IDatabase } from '@application/protocols/database';
import { IHashService, ITokenService, IUuidService } from '@application/protocols/services';
import { InvalidTokenError, UserRegisteredError } from '@application/errors';

export class CreateUser implements ICreateUser {
	constructor(
		private readonly userRepository: IDatabase.Repositories.User,
		private readonly uuidService: IUuidService,
		private readonly tokenService: ITokenService,
		private readonly hashService: IHashService
	) {}

	async exec(params: ICreateUser.Params): ICreateUser.Result {
		if (await this.userRepository.getOne({ cpf: params.cpf, includeDeleted: true })) throw new UserRegisteredError('CPF');
		if (await this.userRepository.getOne({ rg: params.rg, includeDeleted: true })) throw new UserRegisteredError('RG');
		if (await this.userRepository.getOne({ phone: params.phone, includeDeleted: true })) throw new UserRegisteredError('Phone');
		if (await this.userRepository.getOne({ email: params.email, includeDeleted: true })) throw new UserRegisteredError('Email');

		const decoded = this.tokenService.decode({ token: params.inviteToken, type: 'OTHER' }) as InviteToken;

		if (decoded.email !== params.email) throw new InvalidTokenError();

		const user = new User({
			id: this.uuidService.generate(),
			firstName: params.firstName,
			lastName: params.lastName,
			cpf: params.cpf,
			rg: params.rg,
			phone: params.phone,
			email: params.email,
			password: this.hashService.hash(params.password),
			birthday: params.birthday,
			address: params.address,
		});

		return this.userRepository.create(user);
	}
}

type InviteToken = { email: string; firstName: string; lastName: string };
