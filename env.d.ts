declare global {
  namespace NodeJS {
    // Alias for compatibility
    interface ProcessEnv extends Dict<string> {
      /**
       * Discord bot token
       */
      TOKEN: string
    }
  }
}

export {}
