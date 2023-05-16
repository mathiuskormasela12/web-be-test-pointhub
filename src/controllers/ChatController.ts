// ========== Chat Controller
// import all modules
import { Request, type Response } from 'express'
import ChatService from '../services/ChatService'
import { response } from '../helpers/response'
import { ISendChatResponse } from '../types/chat.response.types'
import { IGetChatListResponse } from '../schemas/ChatSchema'

class ChatController {
  public async sendChat (req: Request, res: Response): Promise<Response> {
    const chatService = new ChatService()
    const result = await chatService.sendChat(req.body, req, req.headers['x-access-token']?.toString() ?? '')
    return response<ISendChatResponse>(res, result)
  }

  public async getChatLists (req: Request, res: Response): Promise<Response> {
    const chatService = new ChatService()
    const result = await chatService.getChatLists(req, req.headers['x-access-token']?.toString() ?? '', req.params.receiverId)
    return response<IGetChatListResponse>(res, result)
  }
}

export default new ChatController()
