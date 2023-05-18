// ========== Chat Service
// import all modules
import { Request as ExpressRequest } from 'express'
import { Body, Post, Route, Tags, Request, Security, Header, Get, SuccessResponse, Example, Response } from 'tsoa'
import { IChatSchemaBody, IGetChatListResponse } from '../schemas/ChatSchema'
import { IResponse } from '../types/response.types'
import { ISendChatResponse } from '../types/chat.response.types'
import chatModel from '../models/chatModel'
import mongoose from 'mongoose'
import { failedToGetChatListsResponse, failedToSendChatResponse, successToGetChatListsResponse, successToSendChatResponse } from '../example/chat.response.example'

@Route('/api/v1/chats')
@Tags('Chats')
class ChatService {
  /**
	 * This is an API to send a new message
	 */
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Send Chat')
  @Example<IResponse<ISendChatResponse>>(successToSendChatResponse)
  @Response<IResponse<ISendChatResponse>>(400, 'Failed Send Chat', failedToSendChatResponse)
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
      console.log(error.message)

      return {
        code: 400,
        message: 'Failed to sent message'
      }
    }
  }

  /**
	 * This is an API to get chat lists
	 */
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Get Chat Lists')
  @Example<IResponse<IGetChatListResponse>>(successToGetChatListsResponse)
  @Response<IResponse<IGetChatListResponse>>(400, 'Failed Get Chat Lists', failedToGetChatListsResponse)
  @Get('/{receiverId}')
  public async getChatLists (
    @Request() req: ExpressRequest,
      @Header('x-access-token') _: string,
      receiverId: string
  ): Promise<IResponse<IGetChatListResponse>> {
    const senderId = req.app.locals?.decoded?.userId

    try {
      const chats = await chatModel.aggregate([
        {
          $match: {
            $or: [
              {
                receiverId: new mongoose.Types.ObjectId(receiverId),
                senderId: new mongoose.Types.ObjectId(senderId)
              },
              {
                receiverId: new mongoose.Types.ObjectId(senderId),
                senderId: new mongoose.Types.ObjectId(receiverId)
              }
            ]
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'receiverId',
            foreignField: '_id',
            as: 'receiverAccount'
          }
        },
        {
          $unwind: {
            path: '$receiverAccount',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'senderId',
            foreignField: '_id',
            as: 'senderAccount'
          }
        },
        {
          $unwind: {
            path: '$senderAccount',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $set: {
            createdAt: {
              $dateToString: {
                date: '$createdAt',
                format: '%Y-%m-%d',
                timezone: 'Asia/Jakarta'
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            'receiverAccount._id': 1,
            'receiverAccount.name': 1,
            'senderAccount._id': 1,
            'senderAccount.name': 1,
            chat: 1,
            createdAt: 1
          }
        }
      ])

      return {
        code: 200,
        message: 'Success get chat lists',
        results: chats
      }
    } catch (err) {
      const error = err as Error

      console.log(error.message)

      return {
        code: 400,
        message: 'Failed to get chat lists'
      }
    }
  }
}

export default ChatService
