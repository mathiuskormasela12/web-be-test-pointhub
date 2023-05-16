// ========== Chat Routes
// import all modules
import { Router } from 'express'
import IRoutes from './IRoutes'
import ChatController from '../controllers/ChatController'
import authMiddleware from '../middlewares/auth.middleware'
import { validateSendChatBody } from '../middlewares/chat.middleware'

class ChatRoutes extends IRoutes {
  protected router: Router

  constructor () {
    super()
    this.router = Router()
    this.setup()
  }

  private setup (): void {
    this.router.post('/chats', authMiddleware.isLoggedIn, validateSendChatBody, ChatController.sendChat)
    this.router.get('/chats/:receiverId', authMiddleware.isLoggedIn, ChatController.getChatLists)
  }

  public get routes (): Router {
    return this.router
  }
}

export default new ChatRoutes()
