// ========== Chat Model
// import all models
import { Schema, model, Types } from 'mongoose'
import { IChatSchemaModel } from '../schemas/ChatSchema'

const schema: Schema = new Schema({
  senderId: Types.ObjectId,
  receiverId: Types.ObjectId,
  chat: String
}, { timestamps: true })

schema.index({ senderId: 1 })
schema.index({ receiverId: 1 })

export default model<IChatSchemaModel>('Chat', schema)
