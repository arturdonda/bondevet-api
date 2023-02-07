import { Address } from '@domain/entities';
import { isCPFValid, isEmailValid } from '@domain/helpers';
import { InvalidParamError } from '@domain/errors';

export class User {
	private _id: string;
	private _firstName: string;
	private _lastName: string;
	private _cpf: string;
	private _rg: string;
	private _phone: string;
	private _email: string;
	private _password: string;
	private _birthday: Date;
	private _address: Address;
	private _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt: Date | null;

	constructor(params: UserParams) {
		this._id = this.validateId(params.id);
		this._firstName = this.validateFirstName(params.firstName);
		this._lastName = this.validateLastName(params.lastName);
		this._cpf = this.validateCpf(params.cpf);
		this._rg = this.validateRg(params.rg);
		this._phone = this.validatePhone(params.phone);
		this._email = this.validateEmail(params.email);
		this._password = this.validatePassword(params.password);
		this._birthday = this.validateBirthday(params.birthday);
		this._address = this.validateAddress(params.address);
		this._createdAt = this.validateCreatedAt(params.createdAt);
		this._updatedAt = this.validateUpdatedAt(params.updatedAt);
		this._deletedAt = this.validateDeletedAt(params.deletedAt);
	}

	//#region Methods
	setDeleted(): void {
		const now = new Date();

		this._deletedAt = now;
		this._updatedAt = now;
	}
	//#endregion Methods

	//#region Getters
	get id(): string {
		return this._id;
	}

	get firstName(): string {
		return this._firstName;
	}

	get lastName(): string {
		return this._lastName;
	}

	get cpf(): string {
		return this._cpf;
	}

	get rg(): string {
		return this._rg;
	}

	get phone(): string {
		return this._phone;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	get birthday(): Date {
		return this._birthday;
	}

	get address(): Address {
		return this._address;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	get updatedAt(): Date {
		return this._updatedAt;
	}

	get deletedAt(): Date | null {
		return this._deletedAt;
	}

	//#endregion Getters

	//#region Setters
	set phone(phone: UserParams['phone']) {
		this._phone = this.validatePhone(phone);
		this._updatedAt = new Date();
	}

	set email(email: UserParams['email']) {
		this._email = this.validateEmail(email);
		this._updatedAt = new Date();
	}

	set password(password: UserParams['password']) {
		this._password = this.validatePassword(password);
		this._updatedAt = new Date();
	}

	set address(address: UserParams['address']) {
		this._address = this.validateAddress(address);
		this._updatedAt = new Date();
	}
	//#endregion Setters

	//#region Validations
	private validateId(id: UserParams['id']): UserParams['id'] {
		return id;
	}

	private validateFirstName(firstName: UserParams['firstName']): UserParams['firstName'] {
		firstName = firstName.trim().replace(/\s+/g, ' ');

		if (firstName.length < 3) throw new InvalidParamError('firstName', 'must be at least 3 characters long');

		return firstName;
	}

	private validateLastName(lastName: UserParams['lastName']): UserParams['lastName'] {
		lastName = lastName.trim().replace(/\s+/g, ' ');

		if (lastName.length < 3) throw new InvalidParamError('lastName', 'must be at least 3 characters long');

		return lastName;
	}

	private validateCpf(cpf: UserParams['cpf']): UserParams['cpf'] {
		if (!isCPFValid(cpf)) throw new InvalidParamError('CPF', 'invalid CPF number');

		return cpf.replace(/\D/g, '');
	}

	private validateRg(rg: UserParams['rg']): UserParams['rg'] {
		return rg.replace(/\W/g, '');
	}

	private validatePhone(phone: UserParams['phone']): UserParams['phone'] {
		phone = phone.replace(/\D/g, '');

		if (phone.length !== 11) throw new InvalidParamError('phone', 'must be 11 characters long');

		return phone;
	}

	private validateEmail(email: UserParams['email']): UserParams['email'] {
		if (!isEmailValid(email)) throw new InvalidParamError('email', 'invalid email format');

		return email.trim().toLowerCase();
	}

	private validatePassword(password: UserParams['password']): UserParams['password'] {
		return password;
	}

	private validateBirthday(birthday: UserParams['birthday']): UserParams['birthday'] {
		if (birthday >= new Date()) throw new InvalidParamError('birthday', 'future date');

		return birthday;
	}

	private validateAddress(address: UserParams['address']): UserParams['address'] {
		if (address.cep) throw new InvalidParamError('address', 'CEP is required');
		if (address.city) throw new InvalidParamError('address', 'city is required');
		if (address.neighborhood) throw new InvalidParamError('address', 'neighborhood is required');
		if (address.number) throw new InvalidParamError('address', 'number is required');
		if (address.state) throw new InvalidParamError('address', 'state is required');
		if (address.street) throw new InvalidParamError('address', 'street is required');

		return address;
	}

	private validateCreatedAt(createdAt: UserParams['createdAt']): NonNullable<UserParams['updatedAt']> {
		if (!createdAt) return new Date();

		return createdAt;
	}

	private validateUpdatedAt(updatedAt: UserParams['updatedAt']): NonNullable<UserParams['updatedAt']> {
		if (!updatedAt) return new Date();

		return updatedAt;
	}

	private validateDeletedAt(deletedAt: UserParams['deletedAt']): Date | null {
		if (deletedAt === undefined) return null;

		return deletedAt;
	}
	//#endregion Validations
}

export type UserParams = {
	id: string;
	firstName: string;
	lastName: string;
	cpf: string;
	rg: string;
	phone: string;
	email: string;
	password: string;
	birthday: Date;
	address: Address;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
};
