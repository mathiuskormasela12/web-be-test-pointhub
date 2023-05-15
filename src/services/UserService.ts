// ========== User Service
// import all modules

import { type Request } from 'express'
import { type IUserResponse } from '../types/user.response.types'
import { type IResponse } from '../types/response.types'

class UserService {
  private readonly params: Request['params']
  private readonly query: Request['query']
  private readonly body: Request['body']

  constructor (req: Request) {
    this.params = req.params
    this.query = req.query
    this.body = req.body
  }

  public getUsers (): IResponse<IUserResponse> {
    return {
      code: 200,
      message: 'Get Users',
      results: [
        {
          id: 1,
          name: 'Mathius'
        }
      ]
    }
  }
}

export default UserService
