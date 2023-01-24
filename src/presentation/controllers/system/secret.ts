import { errorHandler, ok } from '@presentation/helpers';
import { HttpRequest, HttpResponse, IController } from '@presentation/protocols';
import { SSM } from '@aws-sdk/client-ssm';

export class SecretController implements IController {
	async handle(request: HttpRequest): Promise<HttpResponse<any>> {
		try {
			const ssmClient = new SSM({ region: 'us-east-1' });

			const parameters = await ssmClient
				.getParametersByPath({ Path: '/CodeBuild/', WithDecryption: true })
				.then(result => result.Parameters);

			return ok({
				message: 'Secrets Manager',
				result: {
					processEnv: process.env,
					processEnvSecrets: process.env.secrets,
					getParametersByPath: parameters,
				},
			});
		} catch (error) {
			return errorHandler(error, 'Error retrieving AWS Secrets');
		}
	}
}
