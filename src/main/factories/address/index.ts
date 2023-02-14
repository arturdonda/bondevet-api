import { GetAddressFromCEP } from '@application/use-cases/address';
import { CepService } from '@infra/services/cep';
import { GetAddressFromCepController } from '@presentation/controllers/address/get-from-cep';

// Services
const cepService = new CepService();

// Usecases
const getAddressFromCEP = new GetAddressFromCEP(cepService);

// Controllers
export const getAddressFromCepController = new GetAddressFromCepController(getAddressFromCEP);
