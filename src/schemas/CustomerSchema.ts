// ========== Customer Schema
// import all modules
import mongoose from 'mongoose'

export interface ICustomerSchemaModel {
  _id: mongoose.Types.ObjectId
  name: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

export interface IInvoiceSchemaModel {
  _id: mongoose.Types.ObjectId
  customerId: mongoose.Types.ObjectId
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface ICreateCustomerSchemaBody {
  name: string
  phone: string
}

export interface ICreateInvoiceSchemaBody {
  total: number
  phone: string
}

export interface ICreateInvoiceSchemaResponse {
  _id: string
  total: number
  customerId: string
  date: Date
}

export interface IGetInvoiceSchemaResponse {
  _id: string
  total: number
  customer: {
    name: string
    phone: string
  }
  date: string
}
