declare global {
    namespace NodeJS {
        // Alias for compatibility
        interface ProcessEnv extends Dict<string> {
            /**
             * Can be used to change the default timezone at runtime
             */
            TZ?: string;
            /**
             * Discord bot token
             */
            TOKEN: string;
        }
    }
}

export {};
