// ========== Config
// import all modules
import 'dotenv/config'

export default {
  port: process.env?.PORT ?? 3000,
  dbUri: process.env?.DB_URI ?? '',
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
    'http://localhost:3000'
  ]
}
