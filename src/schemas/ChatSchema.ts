// ========== Chat Schema
// import all modules
import mongoose from 'mongoose'

export interface IChatSchemaModel {
  _id: mongoose.Types.ObjectId
  senderId: mongoose.Types.ObjectId
  receiverId: mongoose.Types.ObjectId
  chat: string
  createdAt: Date
  updatedAt: Date
}

export interface IChatSchemaBody {
  receiverId: mongoose.Types.ObjectId
  chat: string
}

export interface IGetChatListResponse {
  _id: mongoose.Types.ObjectId
  chat: string
  createdAt: string
}
