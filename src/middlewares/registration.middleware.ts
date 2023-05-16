// ========== Registration Middleware
// import all modules
import { type NextFunction, type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'
import { response } from '../helpers/response'
import { parsingValidationError } from '../helpers/parsingValidationError'

export const validateRegisterUserBody = [
  body('name', 'name is required').notEmpty(),
  body('name', 'name should be a string').isString(),

  body('phoneNumber', 'phone number is required').notEmpty(),
  body('phoneNumber', 'phone number is invalid').isMobilePhone('any'),

  (req: Request, res: Response, next: NextFunction): Response | boolean => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const result = parsingValidationError(errors.array())

      return response(res, {
        code: 400,
        message: 'Unprocessable Entity',
        errors: result
      })
    }

    next()
    return true
  }
]

export const validateLoginUserBody = [
  body('phoneNumber', 'phone number is required').notEmpty(),
  body('phoneNumber', 'phone number is invalid').isMobilePhone('any'),

  (req: Request, res: Response, next: NextFunction): Response | boolean => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const result = parsingValidationError(errors.array())

      return response(res, {
        code: 400,
        message: 'Unprocessable Entity',
        errors: result
      })
    }

    next()
    return true
  }
]

export const validateCreateAccessTokenBody = [
  body('refreshToken', 'refresh token is required').notEmpty(),
  body('refreshToken', 'refresh token is invalid').isJWT(),

  (req: Request, res: Response, next: NextFunction): Response | boolean => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const result = parsingValidationError(errors.array())

      return response(res, {
        code: 400,
        errors: result
      })
    }

    next()
    return true
  }
]
