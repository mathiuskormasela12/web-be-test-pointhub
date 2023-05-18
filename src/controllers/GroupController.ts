// ========== Group Controller
// import all modules
import { Request, type Response } from 'express'
import GroupService from '../services/GroupService'
import { response } from '../helpers/response'
import { ICreateOrSendGroupChatResponse } from '../types/group.response.types'

class GroupController {
  public createGroup (req: Request, res: Response): Response {
    const groupService = new GroupService()
    const result = groupService.createGroup(req.body, req, req.headers['x-access-token']?.toString() ?? '')
    return response<ICreateOrSendGroupChatResponse>(res, result)
  }

  public async sendGroupChat (req: Request, res: Response): Promise<Response> {
    const chatService = new GroupService()
    const result = chatService.sendGroupChat(req.body, req, req.headers['x-access-token']?.toString() ?? '')
    return response<ICreateOrSendGroupChatResponse>(res, result)
  }

  public async deleteChatForMe (req: Request, res: Response): Promise<Response> {
    const chatService = new GroupService()
    const result = chatService.deleteChatForMe(req, req.headers['x-access-token']?.toString() ?? '', req.params.chatId)
    return response<ICreateOrSendGroupChatResponse>(res, result)
  }

  public async deleteChatForAll (req: Request, res: Response): Promise<Response> {
    const chatService = new GroupService()
    const result = chatService.deleteChatForAll(req, req.headers['x-access-token']?.toString() ?? '', req.params.chatId)
    return response<ICreateOrSendGroupChatResponse>(res, result)
  }

  public async sendImage (req: Request, res: Response): Promise<Response> {
    const chatService = new GroupService()
    const result = chatService.sendImage(req, req.headers['x-access-token']?.toString() ?? '', req.file as never)
    return response<ICreateOrSendGroupChatResponse>(res, result)
  }
}

export default new GroupController()
