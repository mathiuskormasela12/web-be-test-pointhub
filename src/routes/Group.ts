// ========== Group Routes
// import all modules
import { Router } from 'express'
import IRoutes from './IRoutes'
import GroupController from '../controllers/GroupController'
import authMiddleware from '../middlewares/auth.middleware'

class GroupRoutes extends IRoutes {
  protected router: Router

  constructor () {
    super()
    this.router = Router()
    this.setup()
  }

  private setup (): void {
    this.router.post('/group', authMiddleware.isLoggedIn, GroupController.createGroup)
    this.router.post('/group/chat', authMiddleware.isLoggedIn, GroupController.sendGroupChat)
    this.router.delete('/group/chat/:chatId', authMiddleware.isLoggedIn, GroupController.deleteChatForMe)
    this.router.delete('/group/chat-all/:chatId', authMiddleware.isLoggedIn, GroupController.deleteChatForAll)
    this.router.post('/group/chat-image', authMiddleware.isLoggedIn, GroupController.sendImage)
  }

  public get routes (): Router {
    return this.router
  }
}

export default new GroupRoutes()
