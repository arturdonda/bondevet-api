import {
	ChangeUserPassword,
	CreateUser,
	DeleteUser,
	GetAllUsers,
	GetUserById,
	InviteUser,
	UpdateUser,
} from '@application/use-cases/user';
import { database } from '@infra/database';
import { EmailService, HashService, TokenService, UuidService } from '@infra/services';
import {
	ChangeUserPasswordController,
	CreateUserController,
	DeleteUserController,
	GetAllUsersController,
	GetUserByIdController,
	InviteUserController,
	UpdateUserController,
} from '@presentation/controllers/user';

// Repositories
const userRepository = database.repositories.User;
const sessionRepository = database.repositories.Session;

// Services
const emailService = new EmailService();
const hashService = new HashService();
const tokenService = new TokenService();
const uuidService = new UuidService();

// Usecases
const changeUserPassword = new ChangeUserPassword(userRepository, hashService);
const createUser = new CreateUser(userRepository, uuidService, tokenService, hashService);
const deleteUser = new DeleteUser(userRepository, sessionRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const inviteUser = new InviteUser(userRepository, tokenService, emailService);
const updateUser = new UpdateUser(userRepository);

// Controllers
export const changeUserPasswordController = new ChangeUserPasswordController(changeUserPassword);
export const createUserController = new CreateUserController(createUser);
export const deleteUserController = new DeleteUserController(deleteUser);
export const getAllUsersController = new GetAllUsersController(getAllUsers);
export const getUserByIdController = new GetUserByIdController(getUserById);
export const inviteUserController = new InviteUserController(inviteUser);
export const updateUserController = new UpdateUserController(updateUser);
