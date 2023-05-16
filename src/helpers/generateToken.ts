// ========== Generate Token
// import all modules
import jwt from 'jsonwebtoken'
import { IGenerateTokenResponse } from '../types/user.response.types'
import config from '../config'

export const generateToken = (userId: string): IGenerateTokenResponse => {
  if (
    typeof config?.accessToken?.secretKey !== 'string' ||
    typeof config?.refreshToken?.secretKey !== 'string'
  ) {
    return {
      error: 'Secret key is required',
      accessToken: '',
      refreshToken: ''
    }
  }

  if (
    typeof config?.accessToken?.expiresIn !== 'string' ||
    typeof config?.refreshToken?.expiresIn !== 'string'
  ) {
    return {
      error: 'Expires in field is required',
      accessToken: '',
      refreshToken: ''
    }
  }
  const accessToken: string = jwt.sign({ userId }, config.accessToken.secretKey, { expiresIn: config.accessToken.expiresIn })
  const refreshToken: string = jwt.sign({ userId }, config.refreshToken.secretKey, { expiresIn: config.refreshToken.expiresIn })

  return {
    accessToken,
    refreshToken
  }
}
