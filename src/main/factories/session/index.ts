import {
	CreateSession,
	DeleteSession,
	GetAllSessions,
	Login,
	RefreshSession,
	ValidateSession,
} from '@application/use-cases/session';
import { database } from '@infra/database';
import { HashService, IpService, RandomService, TokenService } from '@infra/services';
import {
	DeleteSessionController,
	GetAllSessionsController,
	LoginController,
	RefreshSessionController,
} from '@presentation/controllers/session';

// Repositories
const sessionRepository = database.repositories.Session;
const userRepository = database.repositories.User;

// Services
const tokenService = new TokenService();
const ipService = new IpService();
const hashService = new HashService();
const randomService = new RandomService();

// Usecases
const createSession = new CreateSession(sessionRepository, randomService, ipService);
const deleteSession = new DeleteSession(sessionRepository);
const getAllSessions = new GetAllSessions(sessionRepository);
const refreshSession = new RefreshSession(sessionRepository, tokenService, ipService);
const login = new Login(userRepository, hashService, createSession, refreshSession);
export const validateSession = new ValidateSession(sessionRepository);

// Controllers
export const deleteSessionController = new DeleteSessionController(deleteSession);
export const getAllSessionsController = new GetAllSessionsController(getAllSessions);
export const loginController = new LoginController(login);
export const refreshSessionController = new RefreshSessionController(refreshSession);
