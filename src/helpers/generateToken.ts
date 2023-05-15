// ========== Generate Token
// import all modules
import jwt from 'jsonwebtoken'
import { IRegisterUserResponse } from '../types/user.response.types'
import config from '../config'

export const generateToken = (userId: string): IRegisterUserResponse => {
  const accessToken: string = jwt.sign({ userId }, config?.accessToken?.secretKey ?? '', { expiresIn: config?.accessToken?.expiresIn ?? '1m' })
  const refreshToken: string = jwt.sign({ userId }, config?.refreshToken?.secretKey ?? '', { expiresIn: config?.refreshToken?.expiresIn ?? '5m' })

  return {
    accessToken,
    refreshToken
  }
}
