import { ValidateSession } from '@application/use-cases/session';
import { database } from '@infra/database';

// Repositories
const sessionRepository = database.repositories.Session;

// Services

// Usecases
export const validateSession = new ValidateSession(sessionRepository);

// Controllers
