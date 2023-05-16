// ========== Customer Middleware
// import all modules
import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { response } from '../helpers/response'
import { parsingValidationError } from '../helpers/parsingValidationError'

export const validateCreateCustomerBody = [
  body('name', 'name is required').notEmpty(),

  body('phone', 'phone is required').notEmpty(),
  body('phone', 'phone is invalid').isMobilePhone('any'),

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

export const validateCreateInvoiceBody = [
  body('total', 'total is required').notEmpty(),
  body('total', 'total should be a number').isInt(),

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
