// ========== User Controller
// import all modules
import { type Request, type Response } from 'express'
import UserService from '../services/UserService'
import { response } from '../helpers/response'
import { type IUserResponse } from '../types/user.response.types'

class UserController {
  public getUsers (req: Request, res: Response): Response {
    const userService = new UserService(req)
    const result = userService.getUsers()
    return response<IUserResponse>(res, result)
  }
}

export default new UserController()
