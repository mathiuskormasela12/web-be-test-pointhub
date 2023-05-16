// ========== User Service
// import all modules
import { Body, Post, Route, Tags } from 'tsoa'
import jwt from 'jsonwebtoken'
import { IRegisterUserResponse } from '../types/user.response.types'
import { IResponse } from '../types/response.types'
import { IRegisterUserSchemaBody, ILoginUserSchemaBody, ICreateAccessTokenBody } from '../schemas/UserSchema'
import userModel from '../models/userModel'
import { generateToken } from '../helpers/generateToken'
import config from '../config'

@Route('/api/v1/users')
@Tags('Users')
class UserService {
  @Post('/register')
  public async registerUser (
    @Body() body: IRegisterUserSchemaBody
  ): Promise<IResponse<IRegisterUserResponse>> {
    try {
      const user = await userModel.findOne({
        phoneNumber: body.phoneNumber
      }).lean().select({ _id: 1 })

      if (user != null) {
        return {
          code: 400,
          message: 'Failed to register',
          errors: {
            phoneNumber: ['phone number already exists']
          }
        }
      } else {
        const result = await userModel.create({
          name: body.name,
          phoneNumber: body.phoneNumber
        })

        const { accessToken, refreshToken, error = '' } = generateToken(result._id.toString())

        if (error.length > 0) {
          return {
            code: 400,
            message: 'Failed to generate token',
            errors: {
              token: [error]
            }
          }
        }

        return {
          code: 201,
          message: 'Register Successfully',
          result: {
            _id: result._id.toString(),
            accessToken,
            refreshToken
          }
        }
      }
    } catch (err) {
      const error = err as Error

      return {
        code: 400,
        message: error.message
      }
    }
  }

  @Post('/login')
  public async loginUser (
    @Body() body: ILoginUserSchemaBody
  ): Promise<IResponse<IRegisterUserResponse>> {
    try {
      const user = await userModel.findOne({
        phoneNumber: body.phoneNumber
      }).lean().select({ _id: 1 })

      if (user != null) {
        const { accessToken, refreshToken, error = '' } = generateToken(user._id.toString())

        if (error.length > 0) {
          return {
            code: 400,
            message: 'Failed to generate token',
            errors: {
              token: [error]
            }
          }
        }

        return {
          code: 200,
          message: 'Login Successfully',
          result: {
            _id: user._id.toString(),
            accessToken,
            refreshToken
          }
        }
      } else {
        return {
          code: 401,
          message: 'Failed to login',
          errors: {
            phoneNumber: ['The phone number does not exists']
          }
        }
      }
    } catch (err) {
      const error = err as Error

      return {
        code: 400,
        message: error.message
      }
    }
  }

  @Post('/access-token')
  public createAccessToken (@Body() body: ICreateAccessTokenBody): IResponse<IRegisterUserResponse> {
    try {
      const decoded = jwt.verify(body.refreshToken, config?.refreshToken?.secretKey ?? '')

      const { accessToken, refreshToken, error = '' } = generateToken(typeof decoded === 'object' ? decoded.userId : '')

      if (error.length > 0) {
        return {
          code: 400,
          message: 'Failed to generate token',
          errors: {
            token: [error]
          }
        }
      }

      return {
        code: 200,
        message: 'The access token has been created',
        result: {
          _id: typeof decoded === 'object' ? decoded.userId : '',
          accessToken,
          refreshToken
        }
      }
    } catch (err) {
      const error = err as Error

      return {
        code: 400,
        message: error.message
      }
    }
  }
}

export default UserService
