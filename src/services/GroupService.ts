// ========== Group Service
// import all modules
import { Request as ExpressRequest } from 'express'
import { Body, Post, Route, Tags, Request, Security, Header, SuccessResponse, Example, Response, Delete, UploadedFile } from 'tsoa'
import { IResponse } from '../types/response.types'
import { ICreateOrSendGroupChatResponse } from '../types/group.response.types'
import { failedToCreateGroupChat, failedToDeleteGroupChatForAll, failedToDeleteGroupChatForMe, failedToSendGroupChat, failedToSendImage, successToCreateGroupChat, successToDeleteGroupChatForAll, successToDeleteGroupChatForMe, successToSendGroupChat, successToSendImage } from '../example/group.response.example'
import { ICreateGroupChatBody, ISendGroupChatBody } from '../schemas/GroupSchema'

@Route('/api/v1/group')
@Tags('Group')
class GroupService {
  /**
	 * This is an API to create a new group chat
	 */
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Create Group Chat')
  @Example<IResponse<ICreateOrSendGroupChatResponse>>(successToCreateGroupChat)
  @Response<IResponse<ICreateOrSendGroupChatResponse>>(400, 'Failed Create Group Chat', failedToCreateGroupChat)
  @Post('/')
  public createGroup (
    @Body() body: ICreateGroupChatBody,
      @Request() req: ExpressRequest,
      @Header('x-access-token') _: string
  ): IResponse<ICreateOrSendGroupChatResponse> {
    return {
      code: 200,
      message: 'The group has been created successfully'
    }
  }

  /**
	 * This is an API to send a chat to the group chat
	 */
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Send Group Chat')
  @Example<IResponse<ICreateOrSendGroupChatResponse>>(successToSendGroupChat)
  @Response<IResponse<ICreateOrSendGroupChatResponse>>(400, 'Failed Send Group Chat', failedToSendGroupChat)
  @Post('/chat')
  public sendGroupChat (
    @Body() body: ISendGroupChatBody,
      @Request() req: ExpressRequest,
      @Header('x-access-token') _: string
  ): IResponse<ICreateOrSendGroupChatResponse> {
    return {
      code: 200,
      message: 'The chat has been sent'
    }
  }

  /**
	 * This is an API to remove a chat for me
	 */
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Delete Chat')
  @Example<IResponse<ICreateOrSendGroupChatResponse>>(successToDeleteGroupChatForMe)
  @Response<IResponse<ICreateOrSendGroupChatResponse>>(400, 'Failed Delete Chat', failedToDeleteGroupChatForMe)
  @Delete('/chat/{chatId}')
  public deleteChatForMe (
    @Request() req: ExpressRequest,
      @Header('x-access-token') _: string,
      chatId: string
  ): IResponse<ICreateOrSendGroupChatResponse> {
    return {
      code: 200,
      message: 'The chat has been deleted'
    }
  }

  /**
	 * This is an API to remove a chat for all group chat members
	 */
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Delete Chat')
  @Example<IResponse<ICreateOrSendGroupChatResponse>>(successToDeleteGroupChatForAll)
  @Response<IResponse<ICreateOrSendGroupChatResponse>>(400, 'Failed Delete Chat For All', failedToDeleteGroupChatForAll)
  @Delete('/chat-all/{chatId}')
  public deleteChatForAll (
    @Request() req: ExpressRequest,
      @Header('x-access-token') _: string,
      chatId: string
  ): IResponse<ICreateOrSendGroupChatResponse> {
    return {
      code: 200,
      message: 'The chat has been deleted for all group member'
    }
  }

  /**
	 * This is an API to send an image to the a group chat
	 */
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Send Image')
  @Example<IResponse<ICreateOrSendGroupChatResponse>>(successToSendImage)
  @Response<IResponse<ICreateOrSendGroupChatResponse>>(400, 'Failed Send Image', failedToSendImage)
  @Post('/chat-image')
  public sendImage (
    @Request() req: ExpressRequest,
      @Header('x-access-token') _: string,
      @UploadedFile() image: Express.Multer.File | null
  ): IResponse<ICreateOrSendGroupChatResponse> {
    return {
      code: 200,
      message: 'The image has been sent to the group'
    }
  }
}

export default GroupService
