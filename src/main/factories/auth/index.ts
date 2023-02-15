import {
	ChangeUserPasswordWithToken,
	Login,
	RefreshSession,
	RequestPasswordChange,
	ValidateSession,
} from '@application/use-cases/auth';
import { database } from '@infra/database';
import { EmailService, HashService, IpService, TokenService } from '@infra/services';
import {
	ChangeUserPasswordWithTokenController,
	LoginController,
	RefreshSessionController,
	RequestPasswordChangeController,
} from '@presentation/controllers/auth';
import { createSession } from '@main/factories/session';

// Repositories
const sessionRepository = database.repositories.Session;
const userRepository = database.repositories.User;

// Services
const emailService = new EmailService();
const tokenService = new TokenService();
const ipService = new IpService();
const hashService = new HashService();

// Usecases
const changeUserPasswordWithToken = new ChangeUserPasswordWithToken(userRepository, hashService, tokenService);
const refreshSession = new RefreshSession(sessionRepository, tokenService, ipService);
const login = new Login(userRepository, hashService, createSession, refreshSession);
export const validateSession = new ValidateSession(sessionRepository);
const requestPasswordChange = new RequestPasswordChange(userRepository, emailService, tokenService);

// Controllers
export const changeUserPasswordWithTokenController = new ChangeUserPasswordWithTokenController(changeUserPasswordWithToken);
export const loginController = new LoginController(login);
export const refreshSessionController = new RefreshSessionController(refreshSession);
export const requestPasswordChangeController = new RequestPasswordChangeController(requestPasswordChange);
