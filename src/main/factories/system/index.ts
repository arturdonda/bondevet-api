import { HealthCheckController, NotFoundController, SecretController } from '@presentation/controllers/system';

// Controllers
export const healthCheckController = new HealthCheckController();
export const notFoundController = new NotFoundController();
export const secretController = new SecretController();