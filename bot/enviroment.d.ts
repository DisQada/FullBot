declare global {
	namespace NodeJS {
		interface ProcessEnv {
			botToken: string;
			clientId: string;
			devGuildId: string;
			supportGuildId: string;
		}
	}
}

export {};
