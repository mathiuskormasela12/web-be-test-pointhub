// ========== Chat Service
// import all modules
import { Request as ExpressRequest } from 'express'
import { Body, Post, Route, Tags, Request, Security, Header } from 'tsoa'
import { IChatSchemaBody } from '../schemas/ChatSchema'
import { IResponse } from '../types/response.types'
import { ISendChatResponse } from '../types/chat.response.types'
import chatModel from '../models/chatModel'

@Route('/api/v1/chats')
@Tags('Chats')
class ChatSerivce {
  @Security('jwt', ['x-access-token'])
  @Post('/')
  public async sendChat (
    @Body() body: IChatSchemaBody,
      @Request() req: ExpressRequest,
      @Header('x-access-token') _: string
  ): Promise<IResponse<ISendChatResponse>> {
    try {
      await chatModel.create({
        senderId: req.app.locals?.decoded?.userId,
        receiverId: body.receiverId,
        chat: body.chat
      })

      return {
        code: 200,
        message: 'Message is sent successfully',
        result: {
          message: body.chat
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

export default ChatSerivce
