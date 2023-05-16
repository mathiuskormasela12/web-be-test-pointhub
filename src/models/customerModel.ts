// ========== Customer Model
// import all modules
import { Schema, model } from 'mongoose'
import { ICustomerSchemaModel } from '../schemas/CustomerSchema'

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

schema.index({ phone: 1 })

export default model<ICustomerSchemaModel>('Customer', schema)
