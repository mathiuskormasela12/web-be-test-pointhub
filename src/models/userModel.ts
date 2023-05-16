// ========== User Model
// import all modules
import { Schema, model } from 'mongoose'
import { IUserSchemaModel } from '../schemas/UserSchema'

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

schema.index({ phoneNumber: 1 })

export default model<IUserSchemaModel>('User', schema)
