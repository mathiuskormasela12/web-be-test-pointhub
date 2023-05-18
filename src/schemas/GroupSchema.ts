// ========== Group Schema
// import all modules
import mongoose from 'mongoose'

export interface ICreateGroupChatBody {
  groupName: string
}

export interface ISendGroupChatBody {
  chat: string
  senderId: mongoose.Types.ObjectId
  groupId: mongoose.Types.ObjectId
}
