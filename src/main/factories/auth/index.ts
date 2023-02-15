import { ForgotPassword, Login, RefreshSession, ResetPassword, ValidateSession } from '@application/use-cases/auth';
import { database } from '@infra/database';
import { EmailService, HashService, IpService, TokenService } from '@infra/services';
import {
	ForgotPasswordController,
	LoginController,
	RefreshSessionController,
	ResetPasswordController,
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
const forgotPassword = new ForgotPassword(userRepository, emailService, tokenService);
const refreshSession = new RefreshSession(sessionRepository, tokenService, ipService);
const login = new Login(userRepository, hashService, createSession, refreshSession);
export const validateSession = new ValidateSession(sessionRepository);
const resetPassword = new ResetPassword(userRepository, hashService, tokenService);

// Controllers
export const forgotPasswordController = new ForgotPasswordController(forgotPassword);
export const loginController = new LoginController(login);
export const refreshSessionController = new RefreshSessionController(refreshSession);
export const resetPasswordController = new ResetPasswordController(resetPassword);
