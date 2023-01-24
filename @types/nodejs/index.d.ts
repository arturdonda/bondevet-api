declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'dev' | 'prod' | 'test';
		SECRET: string;
	}
}
