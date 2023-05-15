// ========== User Routes
// import all modules
import { Router } from 'express'
import IRoutes from './IRoutes'
import UserController from '../controllers/UserController'
import { validateGetUsersBody } from '../middlewares/registration.middleware'

class UserRoutes extends IRoutes {
  protected router: Router

  constructor () {
    super()
    this.router = Router()
    this.setup()
  }

  private setup (): void {
    this.router.post('/users', validateGetUsersBody, UserController.getUsers)
  }

  public get routes (): Router {
    return this.router
  }
}

export default new UserRoutes()
