// ========== Config
// import all modules
import 'dotenv/config'

export default {
  port: process.env?.PORT ?? 3000,
  database: {
    uri: process.env?.DB_URI ?? '',
    name: process.env?.DB_NAME ?? ''
  },
  env: process.env?.NODE_ENV ?? 'development',
  accessToken: {
    secretKey: process.env?.ACCESS_TOKEN_SECRET_KEY,
    expiresIn: process.env?.ACCESS_TOKEN_EXPIRES_IN
  },
  refreshToken: {
    secretKey: process.env?.REFRESH_TOKEN_SECRET_KEY,
    expiresIn: process.env?.REFRESH_TOKEN_EXPIRES_IN
  },
  clients: [
    'http://localhost:3000',
    `http://localhost:${process.env?.PORT ?? 3000}`,
    `http://127.0.0.1:${process.env?.PORT ?? 3000}`
  ]
}
