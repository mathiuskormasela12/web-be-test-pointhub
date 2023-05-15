// ========== User Service
// import all modules
import { Body, Post, Route } from 'tsoa'
import { type IUserResponse } from '../types/user.response.types'
import { type IResponse } from '../types/response.types'
import { IUserSchemaBody } from '../schemas/UserSchema'

@Route('/api/v1')
class UserService {
  @Post('/users')
  public registerUser (
    @Body() body: IUserSchemaBody
  ): IResponse<IUserResponse> {
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
