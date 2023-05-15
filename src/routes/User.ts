// ========== User Routes
// import all modules
import { Router } from 'express'
import IRoutes from './IRoutes'
import UserController from '../controllers/UserController'
import { validateRegisterUserBody, validateLoginUserBody } from '../middlewares/registration.middleware'

class UserRoutes extends IRoutes {
  protected router: Router

  constructor () {
    super()
    this.router = Router()
    this.setup()
  }

  private setup (): void {
    this.router.post('/users/register', validateRegisterUserBody, UserController.registerUser)
    this.router.post('/users/login', validateLoginUserBody, UserController.loginUser)
  }

  public get routes (): Router {
    return this.router
  }
}

export default new UserRoutes()
