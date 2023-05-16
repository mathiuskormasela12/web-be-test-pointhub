// ========== User Controller
// import all modules
import { Request, type Response } from 'express'
import UserService from '../services/UserService'
import { response } from '../helpers/response'
import { IRegisterUserResponse } from '../types/user.response.types'

class UserController {
  public async registerUser (req: Request, res: Response): Promise<Response> {
    const userService = new UserService()
    const result = await userService.registerUser(req.body)
    return response<IRegisterUserResponse>(res, result)
  }

  public async loginUser (req: Request, res: Response): Promise<Response> {
    const userService = new UserService()
    const result = await userService.loginUser(req.body)
    return response<IRegisterUserResponse>(res, result)
  }

  public async createAccessToken (req: Request, res: Response): Promise<Response> {
    const userService = new UserService()
    const result = userService.createAccessToken(req.body)
    return response<IRegisterUserResponse>(res, result)
  }
}

export default new UserController()
