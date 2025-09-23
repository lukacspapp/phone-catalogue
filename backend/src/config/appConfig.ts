export const appConfig = {
  port: process.env.PORT || 3001,
  dataPath: process.env.DATA_PATH || '../data/phones.json',
  isDevelopment: process.env.NODE_ENV === 'development',
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
} as const;