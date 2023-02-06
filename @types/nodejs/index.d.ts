declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'dev' | 'prod' | 'test';
		EMAIL_SERVICE_USERNAME: string;
		EMAIL_SERVICE_PASSWORD: string;
		FRONTEND_BASE_URL: string;
		ACCESS_TOKEN_SECRET: string;
		OTHER_TOKENS_SECRET: string;
	}
}
