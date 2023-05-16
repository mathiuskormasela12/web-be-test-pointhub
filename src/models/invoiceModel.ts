// ========== Invoice Model
// import all modules
import mongoose, { Schema, model } from 'mongoose'
import { IInvoiceSchemaModel } from '../schemas/CustomerSchema'

const schema: Schema = new Schema({
  customerId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  total: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
})

schema.index({ customerId: 1 })

export default model<IInvoiceSchemaModel>('Invoice', schema)
