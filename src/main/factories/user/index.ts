import {
	ChangeUserPassword,
	ChangeUserPasswordWithToken,
	CreateUser,
	DeleteUser,
	GetAllUsers,
	GetUserById,
	InviteUser,
	RequestPasswordChange,
	UpdateUser,
} from '@application/use-cases/user';
import { database } from '@infra/database';
import { EmailService, HashService, TokenService, UuidService } from '@infra/services';
import {
	ChangeUserPasswordController,
	ChangeUserPasswordWithTokenController,
	CreateUserController,
	DeleteUserController,
	GetAllUsersController,
	GetUserByIdController,
	InviteUserController,
	RequestPasswordChangeController,
	UpdateUserController,
} from '@presentation/controllers/user';

// Repositories
const userRepository = database.repositories.User;

// Services
const emailService = new EmailService();
const hashService = new HashService();
const tokenService = new TokenService();
const uuidService = new UuidService();

// Usecases
const changeUserPassword = new ChangeUserPassword(userRepository, hashService);
const changeUserPasswordWithToken = new ChangeUserPasswordWithToken(userRepository, hashService, tokenService);
const createUser = new CreateUser(userRepository, uuidService, tokenService);
const deleteUser = new DeleteUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const inviteUser = new InviteUser(userRepository, tokenService, emailService);
const requestPasswordChange = new RequestPasswordChange(userRepository, emailService, tokenService);
const updateUser = new UpdateUser(userRepository);

// Controllers
export const changeUserPasswordController = new ChangeUserPasswordController(changeUserPassword);
export const changeUserPasswordWithTokenController = new ChangeUserPasswordWithTokenController(
	changeUserPasswordWithToken
);
export const createUserController = new CreateUserController(createUser);
export const deleteUserController = new DeleteUserController(deleteUser);
export const getAllUsersController = new GetAllUsersController(getAllUsers);
export const getUserByIdController = new GetUserByIdController(getUserById);
export const inviteUserController = new InviteUserController(inviteUser);
export const requestPasswordChangeController = new RequestPasswordChangeController(requestPasswordChange);
export const updateUserController = new UpdateUserController(updateUser);
