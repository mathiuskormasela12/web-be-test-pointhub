// ========== Response
// import all modules
import { type Response } from 'express'
import { type IResponse } from '../types/response.types'

export const response = <T>(res: Response, responseBody: IResponse<T>): Response => {
  return res.status(responseBody.code).json(responseBody)
}
