import { CreateSession, DeleteSession, GetAllSessions } from '@application/use-cases/session';
import { database } from '@infra/database';
import { IpService, RandomService, UuidService } from '@infra/services';
import { DeleteSessionController, GetAllSessionsController } from '@presentation/controllers/session';

// Repositories
const sessionRepository = database.repositories.Session;

// Services
const ipService = new IpService();
const uuidService = new UuidService();
const randomService = new RandomService();

// Usecases
export const createSession = new CreateSession(sessionRepository, uuidService, randomService, ipService);
const deleteSession = new DeleteSession(sessionRepository);
const getAllSessions = new GetAllSessions(sessionRepository);

// Controllers
export const deleteSessionController = new DeleteSessionController(deleteSession);
export const getAllSessionsController = new GetAllSessionsController(getAllSessions);
