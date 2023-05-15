// ========== Registration Middleware
// import all modules
import { type NextFunction, type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'
import { response } from '../helpers/response'
import { parsingValidationError } from '../helpers/parsingValidationError'

export const validateGetUsersBody = [
  body('firstName', 'The first name is required').notEmpty(),
  body('firstName', 'The first name should be a string').isString(),

  body('lastName', 'The last name should be a string').default('').isString(),

  body('phoneNumber', 'The phone number is required').notEmpty(),
  body('phoneNumber', 'The phone number is invalid').isMobilePhone('any'),

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
