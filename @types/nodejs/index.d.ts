declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'dev' | 'prod' | 'test';
		DB_HOST: string;
		DB_PORT: string;
		DB_NAME: string;
		DB_USERNAME: string;
		DB_PASSWORD: string;
		EMAIL_SERVICE_USERNAME: string;
		EMAIL_SERVICE_PASSWORD: string;
		FRONTEND_BASE_URL: string;
		ACCESS_TOKEN_SECRET: string;
		OTHER_TOKENS_SECRET: string;
		IPDATA_KEY: string;
	}
}
