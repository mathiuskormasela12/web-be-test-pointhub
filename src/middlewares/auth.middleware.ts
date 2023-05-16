// ========== Auth Middleware
// import all modules
import { NextFunction, Request as ExpressRequest, Response } from 'express'
import jwt from 'jsonwebtoken'
import { response } from '../helpers/response'
import config from '../config'
import { Request } from 'tsoa'

class AuthMiddleware {
  public isLoggedIn (
    @Request() req: ExpressRequest,
      res: Response,
      next: NextFunction
  ): void {
    const token = req.headers['x-access-token']

    if (typeof token !== 'undefined') {
      try {
        const decoded = jwt.verify(token.toString(), config?.accessToken?.secretKey ?? '')
        req.app.locals.decoded = decoded
        next()
      } catch (err) {
        const error = err as Error

        response(res, {
          code: 401,
          message: 'Unauthorized Access',
          errors: {
            token: [error.message]
          }
        })
      }
    } else {
      response(res, {
        code: 401,
        message: 'Unauthorized Access'
      })
    }
  }
}

export default new AuthMiddleware()
