// ========== Chat Middleware
// import all modules
import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { response } from '../helpers/response'
import { parsingValidationError } from '../helpers/parsingValidationError'

export const validateSendChatBody = [
  body('receiverId', 'receiver id is required').notEmpty(),
  body('receiverId', 'receiver id should be a mongodb object id').isMongoId(),

  body('chat', 'chat is required').notEmpty(),

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
