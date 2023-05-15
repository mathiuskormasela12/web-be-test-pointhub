// ========== Registration Middleware
// import all modules
import { type NextFunction, type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'
import { response } from '../helpers/response'
import { parsingValidationError } from '../helpers/parsingValidationError'

export const validateGetUsersBody = [
  body('phoneNumber', 'The phone number is required').notEmpty(),

  body('phoneNumber', 'The phone number is invalid').isMobilePhone('any'),

  body('password', 'password is required').notEmpty(),

  (req: Request, res: Response, next: NextFunction): Response | boolean => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const result = parsingValidationError(errors.array())

      return response(res, {
        code: 200,
        errors: result
      })
    }

    next()
    return true
  }
]
